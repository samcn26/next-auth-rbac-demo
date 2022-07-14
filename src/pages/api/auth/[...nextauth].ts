import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { decrypt, getEnvKey } from '@/src/utils'
import { userSchema } from '@/src/schemas'
import { apiPost } from '@/src/lib/http'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'name', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, { query }) {
        // credentials from login

        query = await userSchema
          .camelCase()
          .validate(query, { abortEarly: false, stripUnknown: true })
        const { name, password }: any = query

        const data = await apiPost('/api/login', {
          name,
          password
        })

        if (data?.user) {
          if (password !== decrypt(data.user.password)) {
            throw new Error('wrong password')
          }

          return data
        }

        throw new Error('user not found')
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // user && (token.user = user)
      if (user) {
        token = {
          ...token,
          ...user
        }
      }
      return token
    },
    session: async ({ session, token }: any) => {
      // session.user = token.user // Setting token in session
      const { user, role, menu } = token
      session = {
        ...session,
        user,
        role,
        menu
      }
      return session
    }
  },
  secret: getEnvKey('KEY_AUTH'),
  pages: {
    signIn: '/login', // Need to define custom login page (if using)
    error: '/login'
  }
}

export default NextAuth(authOptions)
