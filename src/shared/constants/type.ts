export const TokenType = {
  ForgotPasswordToken: 'ForgotPasswordToken',
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken',
  EmailVerifyToken: 'EmailVerifyToken'
} as const

export const Role = {
  USER: 'USER',
  MENTOR: 'MENTOR',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF'
} as const
export type RoleType = (typeof Role)[keyof typeof Role]
export const RoleValues = Object.values(Role) as [RoleType, ...RoleType[]]

// Status User
export const StatusUser = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED'
} as const
export type StatusUserType = (typeof StatusUser)[keyof typeof StatusUser]
export const StatusUserValues = Object.values(StatusUser) as [StatusUserType, ...StatusUserType[]]

// Status Mentor
export const StatusMentor = {
  ACTIVE: 'ACTIVE',
  OFFLINE: 'OFFLINE'
} as const
export type StatusMentorType = (typeof StatusMentor)[keyof typeof StatusMentor]
export const StatusMentorValues = Object.values(StatusMentor) as [StatusMentorType, ...StatusMentorType[]]

// Session Status
export const SessionStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED'
} as const
export type SessionStatusType = (typeof SessionStatus)[keyof typeof SessionStatus]
export const SessionStatusValues = Object.values(SessionStatus) as [SessionStatusType, ...SessionStatusType[]]

// Payment Status
export const PaymentStatus = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
} as const
export type PaymentStatusType = (typeof PaymentStatus)[keyof typeof PaymentStatus]
export const PaymentStatusValues = Object.values(PaymentStatus) as [PaymentStatusType, ...PaymentStatusType[]]
