import { object, string, TypeOf } from 'yup'

export const userSchema = object({
  name: string().required().min(2).max(10),
  password: string().required().min(4)

  //   enum
  //   nationaltities: array(
  //     object({
  //       country: string().required().oneOf(['CN', 'USA'])
  //     })
  //   )
})

export type User = TypeOf<typeof userSchema>
