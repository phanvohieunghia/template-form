import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().min(1, { message: 'Bạn chưa nhập email.' }).email({ message: 'Bạn chưa nhập đúng định dạng email.' }),
  // .min(5, { message: 'Too short' }).max(20, { message: 'Too long' }),
  password: z.string().min(1, { message: 'Bạn chưa nhập mật khẩu' }),
  // .min(5, { message: 'Too short' }).max(20, { message: 'Too long' }),
})
export type LoginVariables = z.infer<typeof loginSchema>

export const validateLogin = <T>(data: T) => {
  const result = loginSchema.safeParse(data)

  if (!result.success) {
    const formattedError = result.error.format()
    return {
      email: formattedError.email?._errors[0] || '',
      password: formattedError.password?._errors[0] || '',
    }
  }
  return null // No errors
}
