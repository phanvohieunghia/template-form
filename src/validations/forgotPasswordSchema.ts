import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: 'Bạn chưa nhập email.' }).email({ message: 'Bạn chưa nhập đúng định dạng email.' }),
})
export type ForgotPasswordVariables = z.infer<typeof forgotPasswordSchema>

export const validateForgotPassword = <T>(data: T) => {
  const result = forgotPasswordSchema.safeParse(data)

  if (!result.success) {
    const formattedError = result.error.format()
    return {
      email: formattedError.email?._errors[0] || '',
    }
  }
  return null // No errors
}
