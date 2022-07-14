import React, { ReactNode, useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button, Menu } from 'antd'
import styles from '@/src/styles/layout.module.css'
import { useRouter } from 'next/router'
import { MenuClickEventHandler } from 'rc-menu/lib/interface'
import getRoutes from '@/src/routes'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session } = useSession()

  const [items, setItems] = useState<ItemType[]>([])

  useEffect(() => {
    if (session && Array.isArray(session.menu)) {
      setItems(getRoutes(session.menu))
    }
  }, [session?.menu])

  const router = useRouter()
  const [activeKey, setActiveKey] = useState<string[]>([])
  const [openKeys, setOpenKey] = useState<string[]>([])

  useEffect(() => {
    const key = router.asPath.slice(1).split('?')[0]
    setActiveKey([key])
    if (key.includes('/')) {
      setOpenKey([key.split('/')[0]])
    }
  }, [router])

  const onNavigate: MenuClickEventHandler = ({ key }) => {
    router.push(key.slice(0) !== '/' ? '/' + key : key)
  }

  return (
    <div className={styles.layout}>
      <div className={styles['layout-head']}>
        {session && session.user && (
          <>
            <span>Signed in as {session.user.name}</span>
            <Button
              type="primary"
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              Log Out
            </Button>
          </>
        )}
      </div>

      <main className={styles['layout-main']}>
        <div className={styles['layout-sidebar']}>
          <Menu
            items={items}
            style={{ width: 240 }}
            mode="inline"
            selectedKeys={activeKey}
            openKeys={openKeys}
            onClick={onNavigate}
            onOpenChange={(opks) => setOpenKey(opks)}
          />
        </div>
        <div className={styles['layout-content']}>{children}</div>
      </main>
    </div>
  )
}
