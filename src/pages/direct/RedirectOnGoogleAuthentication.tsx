import { LocalStorageService, URLSearchParamsService } from '@/services'
import { LOCAL_STORAGE, ROUTE_NAME } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export const RedirectOnGoogleAuthentication = () => {
  const x = URLSearchParamsService.get
  Object.entries(x).map(([key, value]) => {
    if (key === 'accessToken') LocalStorageService.instance.set(LOCAL_STORAGE.ACCESS_TOKEN, value)
    else if (key === 'refreshToken') LocalStorageService.instance.set(LOCAL_STORAGE.REFRESH_TOKEN, value)
    else if (key === 'code') {
      console.log(jwtDecode(value))
    }
  })
  return null
  return <Navigate to={ROUTE_NAME.HOME} />
}
