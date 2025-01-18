interface AppConfig {
  title: string
  restFullApiUrl: string
}

export const appConfig: AppConfig = {
  title: 'MẪU VĂN BẢN.VN',
  restFullApiUrl: import.meta.env.VITE_API_BASE_URL || '',
}
