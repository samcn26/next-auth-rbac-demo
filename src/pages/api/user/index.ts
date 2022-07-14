
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/src/lib/db'
import { validate } from '@/src/middleware'
import { userSchema } from '@/src/schemas'
import { encrypt } from '@/src/utils'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return get()
    case 'POST':
      return post(req.body)
    default:
      break
  }

  async function get() {
    const user = await User.findMany()
    res.status(200).json(user)
  }

  async function post(userInfo: any) {
    let { password } = userInfo
    password = encrypt(password)
    const user = await User.create({
      data: { ...userInfo, password }
    })
    res.status(200).json(user)
  }
}

export default validate(userSchema, handler, true)
