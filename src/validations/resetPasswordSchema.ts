import { z } from 'zod'

const resetPasswordSchema = z.object({
  password: z.string().min(1, { message: 'Bạn chưa nhập mật khẩu' }),
  confirmPassword: z.string().min(1, { message: 'Bạn chưa nhập xác nhận mật khẩu' }),
})
export type ResetPasswordVariables = z.infer<typeof resetPasswordSchema>

export const validateResetPassword = <T>(data: T) => {
  const result = resetPasswordSchema.safeParse(data)

  if (!result.success) {
    const formattedError = result.error.format()
    return {
      password: formattedError.password?._errors[0] || '',
      confirmPassword: formattedError.confirmPassword?._errors[0] || '',
    }
  }
  return null // No errors
}
