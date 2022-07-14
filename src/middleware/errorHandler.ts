import { NextApiHandler } from 'next'
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'
import { Validate } from './validate'

export default function errorHandler(schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler, validate: Validate) {
  try {
    return validate(schema, handler)
  } catch (error) {
    
  }
}
