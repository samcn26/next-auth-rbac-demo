import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { decrypt, getEnvKey } from '@/src/utils'
import { User } from '@/src/lib/db'
import { userSchema } from '@/src/schemas'

// import { User } from '@/src/schemas/user'

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

        // const data = await apiPost('http://localhost:3000/api/login', {
        //   name,
        //   password
        // })

        const user = await User.findFirst({
          where: {
            name
          }
        })

        // const menu = await Menu.findMany({
        //   include: {
        //     children: true,
        //     parent: true
        //   },
        //   orderBy: {
        //     order: 'asc'
        //   }
        // })

        if (user) {
          // Any object returned will be saved in `user` property of the JWT

          if (password !== decrypt(user.password)) {
            throw new Error('wrong password')
          }

          return user
        }
        // If you return null then an error will be displayed advising the user to check their details.
        // return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        throw new Error('user not found')
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user // Setting token in session
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
