import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/src/lib/db'
import { validate } from '@/src/middleware'
import { userSchema } from '@/src/schemas'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return post()
    default:
      break
  }

  // return user, role, menu
  async function post() {
    const data = await User.findFirst({
      include: {
        UserRole: {
          include: {
            role: {
              include: {
                RoleMenu: {
                  include: {
                    menu: {
                      include: {
                        children: true,
                        parent: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      where: {
        name: req.body.name
      }
    })

    let ans : any = data
    if (data) {
      ans = getUserData(data)
    }

    res.status(200).json(ans)
  }
}

// fixed pattern from nested prisma user
// here is only example for algo, in real world split to multiple query is better
function getUserData(userInfo: any) {
  const { id, name, password, UserRole } = userInfo
  const user = { id, name, password }
  const role: any[] = []
  const menus: any = {}
  UserRole.forEach((r: { role: any }) => {
    const { role: rl } = r
    role.push(rl.name)

    rl.RoleMenu.length > 0 &&
      rl.RoleMenu.forEach(({ menu }: any) => {
        if (!menus[menu.id]) {
          menus[menu.id] = menu
        }
      })
  })

  // sort
  const menu = sortMenu(Object.values(menus).filter(({ pid }: any) => !pid))

  return {
    user,
    role,
    menu
  }
}

// order is unique
function sortMenu(menus: any[]) {
  if (!Array.isArray(menus)) return null
  return menus
    .reduce((rv, item) => {
      let { key, order, children = [] } = item
      item = {
        key
      }
      if (children.length > 0) {
        children = sortMenu(children)
        item.children = children
      }

      rv[order] = item
      return rv
    }, [])
    .filter((x: any) => x)
}

export default validate(userSchema, handler)
