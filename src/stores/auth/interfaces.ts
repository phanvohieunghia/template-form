import { LoginResType, LogoutBodyType, LogoutResType, RegisterBodyType, RegisterResType } from '@/shared/schemas/auth.schema'

export type LoginResponse = LoginResType

export type SuccessResponse = {
  success: boolean
  redirectTo: string
}

export type AuthResponse = {
  error?: Error
  [key: string]: unknown
}

export type Example = unknown

export type RegisterResponse = RegisterResType
export type RegisterVariables = RegisterBodyType

export type LogoutVariables = LogoutBodyType
export type LogoutResponse = LogoutResType
