interface AppConfig {
  title: string
  restFullApiUrl: string
}

export const appConfig: AppConfig = {
  title: 'MẪU VĂN BẢN.VN' + (import.meta.env.VITE_TITLE ?? ''),
  restFullApiUrl: import.meta.env.VITE_API_BASE_URL || '',
}
