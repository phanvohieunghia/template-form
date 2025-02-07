import {
  ForgotPasswordBodyType,
  ForgotPasswordResType,
  LoginResType,
  LogoutBodyType,
  LogoutResType,
  RegisterBodyType,
  RegisterResType,
  ResetPasswordBodyType,
  ResetPasswordResType,
  VerifyForgotPasswordTokenBodyType,
  VerifyForgotPasswordTokenResType,
} from '@/shared/schemas/auth.schema'

export type LoginResponse = LoginResType

export type SuccessResponse = {
  success: true
  redirectTo?: string
  [key: string]: unknown
}

export type AuthResponse = {
  success: false
  error?: Error
  message: string
  [key: string]: unknown
}

export type Example = unknown

export type RegisterResponse = RegisterResType
export type RegisterVariables = RegisterBodyType

export type LogoutVariables = LogoutBodyType
export type LogoutResponse = LogoutResType

export type ForgotPasswordVariables = ForgotPasswordBodyType
export type ForgotPasswordResponse = ForgotPasswordResType

export type VerifyForgotPasswordVariables = VerifyForgotPasswordTokenBodyType
export type VerifyForgotPasswordResponse = VerifyForgotPasswordTokenResType

export type ResetPasswordVariables = ResetPasswordBodyType
export type ResetPasswordResponse = ResetPasswordResType
