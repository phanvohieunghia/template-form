interface AppConfig {
  title: string
  environment: string
  restFullApiUrl: string
  googleClientId: string
  authorizationRedirectUri: string
}

export const appConfig: AppConfig = {
  title: 'MẪU VĂN BẢN.VN' + (import.meta.env.VITE_ENVIRONMENT ?? '') === 'dev' ? ' - DEV' : '',
  environment: import.meta.env.VITE_ENVIRONMENT || '',
  restFullApiUrl: import.meta.env.VITE_API_BASE_URL || '',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  authorizationRedirectUri: import.meta.env.VITE_GOOGLE_AUTHORIZATION_REDIRECT_URI || '',
}
