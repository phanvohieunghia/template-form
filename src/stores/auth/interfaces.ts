import { LoginResType } from "@/shared/schemas/auth.schema";

export type LoginResponse =  LoginResType

export type SuccessResponse = {
  success: boolean
  redirectTo: string
}

export type AuthResponse = {
  error?: Error
  [key: string]: unknown
}
