export const AUTH_MESSAGES = {
  // Register
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  EMAIL_ALREADY_EXIST: 'Email already exist',
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
