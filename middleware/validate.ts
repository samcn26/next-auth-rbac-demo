import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { number, object } from 'yup'
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

export default function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method && ['POST', 'PUT'].includes(req.method)) {
        const newSchema =
          req.method === 'POST'
            ? schema
            : schema.concat(object({ id: number().required().positive() }))
        req.body = await newSchema
          .camelCase()
          .validate(req.body, { abortEarly: false, stripUnknown: true })
      }
    } catch (error: any) {
      return res.status(400).json({
        message: 'Invalid Input',
        error: error.errors
      })
    }

    try {
      await handler(req, res)
    } catch (error: any) {
      if (typeof error === 'string') {
        // custom application error
        const is404 = error.toLowerCase().endsWith('not found')
        const statusCode = is404 ? 404 : 400
        return res.status(statusCode).json({ message: error })
      }

      if (error.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' })
      }

      // default to 500 server error
      console.error(error)
      return res.status(500).json({ message: error.message })
    }
  }
}

export type Validate = (
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) => (req: NextApiRequest, res: NextApiResponse) => Promise<void>
