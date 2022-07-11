
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/lib/db'
import { validate } from '@/middleware'
import { userSchema } from '@/schemas'

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
    const user = await User.create({
      data: userInfo
    })
    res.status(200).json(user)
  }
}

export default validate(userSchema, handler)
