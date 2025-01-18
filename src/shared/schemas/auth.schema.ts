import z from 'zod'
import { AUTH_MESSAGES } from '../messages/auth-messages'

export const TokenType = {
  ForgotPasswordToken: 'ForgotPasswordToken',
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken',
  EmailVerifyToken: 'EmailVerifyToken',
} as const

export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
} as const
export type RoleType = (typeof Role)[keyof typeof Role]
export const RoleValues = Object.values(Role) as [RoleType, ...RoleType[]]

// Status User
export const StatusUser = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED',
} as const
export type StatusUserType = (typeof StatusUser)[keyof typeof StatusUser]
export const StatusUserValues = Object.values(StatusUser) as [StatusUserType, ...StatusUserType[]]

// User Schema
export const UserSchema = z.object({
  userId: z.string(),
  email: z.string(),
  name: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.enum(RoleValues),
  status: z.enum(StatusUserValues),
  avatar: z.string().nullable(),
  emailVerifyToken: z.string().nullable(),
  forgotPasswordToken: z.string().nullable(),
  resetPasswordToken: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
export type UserSchemaType = z.infer<typeof UserSchema>

export const UserProfileSchema = UserSchema.omit({
  password: true,
  emailVerifyToken: true,
  forgotPasswordToken: true,
  resetPasswordToken: true,
})
export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>

// Register
export const RegisterBody = z
  .object({
    email: z.string(),
    name: z.string(),
    phone: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: AUTH_MESSAGES.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD,
        path: ['confirmPassword'],
      })
    }
  })
export type RegisterBodyType = z.infer<typeof RegisterBody>

export const RegisterRes = z.object({
  message: z.string(),
  data: UserProfileSchema,
})
export type RegisterResType = z.infer<typeof RegisterRes>

// Login
export const LoginBody = z.object({
  email: z.string(),
  password: z.string(),
})
export type LoginBodyType = z.infer<typeof LoginBody>

export const LoginRes = z.object({
  message: z.string(),
  data: z.object({
    profile: UserProfileSchema,
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
})
export type LoginResType = z.infer<typeof LoginRes>

// Logout
export const LogoutBody = z.object({
  refreshToken: z.string(),
})
export type LogoutBodyType = z.infer<typeof LogoutBody>

export const LogoutRes = z.object({
  message: z.string(),
})
export type LogoutResType = z.infer<typeof LogoutRes>

// Forgot Password
export const ForgotPasswordBody = z.object({
  email: z.string(),
})
export type ForgotPasswordBodyType = z.infer<typeof ForgotPasswordBody>

export const ForgotPasswordRes = z.object({
  message: z.string(),
})
export type ForgotPasswordResType = z.infer<typeof ForgotPasswordRes>

// Reset Password
export const ResetPasswordBody = z.object({
  password: z.string(),
  confirmPassword: z.string(),
  forgotPasswordToken: z.string(),
})
export type ResetPasswordBodyType = z.infer<typeof ResetPasswordBody>

export const ResetPasswordRes = z.object({
  message: z.string(),
})
export type ResetPasswordResType = z.infer<typeof ResetPasswordRes>

// change password
export const ChangePasswordBody = z.object({
  password: z.string(),
  confirmPassword: z.string(),
})
export type ChangePasswordBodyType = z.infer<typeof ChangePasswordBody>

export const ChangePasswordRes = z.object({
  message: z.string(),
})
export type ChangePasswordResType = z.infer<typeof ChangePasswordRes>

// Refresh Token
export const RefreshTokenBody = z.object({
  refreshToken: z.string(),
})
export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBody>

export const RefreshTokenRes = z.object({
  message: z.string(),
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
})
export type RefreshTokenResType = z.infer<typeof RefreshTokenRes>
