/* eslint-disable camelcase */
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

type Child = {
    children?: ReactNode
}

const RouteGuard = ({ children } : Child):any => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status !== 'loading') {
      if (status === 'authenticated') {
        setAuthorized(true)

        if (router.asPath === '/') {
          router.push('/dash')
        }
      } else {
        router.push('/login')
      }
    }
  }, [session, router])

  return authorized && children
}

export default RouteGuard
