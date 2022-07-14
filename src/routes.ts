// for antd pattern, fetch data from server, then filter
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { cloneDeep } from 'lodash'
const routes = [
  { label: 'dash', key: 'dash' },
  { label: 'dev', key: 'dev' },
  {
    label: 'settings',
    key: 'settings',
    children: [
      { label: 'user', key: 'settings/user' },
      { label: 'role', key: 'settings/role' },
      { label: 'menu', key: 'settings/menu' }
    ]
  }
]

export default function getRoutes(menus: any[]): ItemType[] {
  return getMenu(menus, routes)
}

// get all props from a object in array, object is tree with children
function getKeyProps(routes: any[], key: string) {
  const path = key.split('/')
  let i
  let k = path[0]
  for (i = 0; i < path.length; i++) {
    if (i !== 0) {
      k = path.slice(0, i + 1).join('/')
    }
    routes = routes.filter((x: { key: any }) => x.key === k)

    if (!routes[0]) return {}

    // 没有children or 最后一个 推出
    if (!routes[0].children || i + 1 === path.length) {
      break
    } else {
      routes = routes[0].children
    }
  }
  const { children, ...args } = routes[0]
  return i + 1 === path.length ? args : {}
}

// modify server sied return menu tree, get all props from routes
function getMenu(origin: any[], routes: ItemType[]): ItemType[] {
  return origin.map((x) => {
    const children = x.children
    x = cloneDeep(getKeyProps(routes, x.key))
    if (children) {
      x.children = getMenu(children, routes)
    }

    return x
  })
}
