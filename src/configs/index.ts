interface AppConfig {
  title: string
  environment: string
  restFullApiUrl: string
  baseUrl: string
  googleClientId: string
}

export const appConfig: AppConfig = {
  title: 'MẪU VĂN BẢN.VN' + ((import.meta.env.VITE_ENVIRONMENT ?? '') === 'dev' ? ' - DEV' : ''),
  environment: import.meta.env.VITE_ENVIRONMENT || '',
  baseUrl: import.meta.env.VITE_BASE_URL || '',
  restFullApiUrl: import.meta.env.VITE_API_BASE_URL || '',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
}
