/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query']
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

const { user: User, menu: Menu, role: Role, roleMenu: RoleMenu } = prisma

export { User, Menu, Role, RoleMenu }
