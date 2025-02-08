import { z } from 'zod'

const registerSchema = z
  .object({
    email: z.string().min(1, { message: 'Bạn chưa nhập email.' }).email({ message: 'Bạn chưa nhập đúng định dạng email.' }),
    name: z.string().min(1, { message: '' }),
    phone: z.string().refine(
      (value) => {
        const regex = /^(?:\+84|0)(?:\d{9})$/
        return regex.test(value)
      },
      {
        message: 'Bạn chưa nhập đúng định dạng số điện thoại. Số điện thoại bắt đầu từ +84 hoặc 0 bao gồm 10 chữ số.',
      },
    ),
    password: z.string().min(1, { message: 'Bạn chưa nhập mật khẩu' }),
    confirmPassword: z.string().min(1, { message: 'Bạn chưa nhập xác nhận mật khẩu' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Xác nhận mật khẩu không đúng',
    path: ['confirmPassword'],
  })

export type RegisterForm = z.infer<typeof registerSchema>

export const validateRegister = <T>(data: T) => {
  const result = registerSchema.safeParse(data)

  if (!result.success) {
    const formattedError = result.error.format()
    return {
      email: formattedError.email?._errors[0] || '',
      name: formattedError.name?._errors[0] || '',
      phone: formattedError.phone?._errors[0] || '',
      password: formattedError.password?._errors[0] || '',
      confirmPassword: formattedError.confirmPassword?._errors[0] || '',
    }
  }
  return null
}

// const passwordSchema = z
//   .string()
//   .min(8, 'Password must be at least 8 characters long')
//   .refine((val) => /[A-Z]/.test(val), 'Password must contain at least one uppercase letter')
//   .refine((val) => /\d/.test(val), 'Password must contain at least one number')
