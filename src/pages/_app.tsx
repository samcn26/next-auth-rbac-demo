import '../styles/global.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import RouteGuard from '../components/RouteGuard'
import Head from '@/src/components/CustomHead'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head />
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
    </>
  )
}

export default MyApp
