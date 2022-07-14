import '../styles/global.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import RouteGuard from '../components/RouteGuard'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {Component.displayName === 'LoginPage'
        ? (
        <Component {...pageProps} />
          )
        : (
          <RouteGuard>
              <Layout>
                <Component {...pageProps} />
              </Layout>
          </RouteGuard>
          )}
    </SessionProvider>
  )
}

export default MyApp
