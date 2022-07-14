import { Menu, MenuProps } from 'antd'
import { FC } from 'react'

// import { ItemType } from 'antd/lib/menu/hooks/useItems'
// import { CSSProperties, FC } from 'react'
// type SideBarProps = {
//     items: ItemType[],
//     style?: CSSProperties,
// }

export const SideBar : FC<MenuProps> = (props) => {
  return <Menu {...props} />
}
