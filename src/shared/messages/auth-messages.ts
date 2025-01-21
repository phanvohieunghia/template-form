export const AUTH_MESSAGES = {
  ACCESS_TOKEN_EXPIRED: 'Access token expired',
  // Register
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  EMAIL_ALREADY_EXIST: 'Email already exist',
  PHONE_ALREADY_EXIST: 'Phone already exist',
  INVALID_PHONE_NUMBER: 'Invalid phone number',
  NAME_REQUIRED: 'Name is required',
  NAME_MUST_BE_STRING: 'Name must be string',
  NAME_LENGTH_MUST_BE_1_TO_100: 'Name length must be 1 to 100',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Email is invalid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG: 'Password must be strong',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password length must be from 6 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG: 'Confirm password must be strong',
  REGISTER_SUCCESS: 'Register success',
  // Login
  EMAIL_OR_PASSWORD_INCORRECT: 'Email or password is incorrect',
  LOGIN_SUCCESS: 'Login success',
  // Logout
  LOGOUT_SUCCESS: 'Logout success',
  // Forgot Password
  USER_NOT_FOUND: 'User not found',
  FORGOT_PASSWORD_SUCCESS: 'Forgot password success',
  // Reset Password
  RESET_PASSWORD_SUCCESS: 'Reset password success',
  // Change Password
  CHANGE_PASSWORD_SUCCESS: 'Change password success',
  // Refresh Token
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  REFRESH_TOKEN_SUCCESS: 'Refresh token success',
  // Guards
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required'
} as const
