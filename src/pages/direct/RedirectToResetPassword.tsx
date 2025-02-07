import { URLSearchParamsService } from '@/services'
import { AuthService } from '@/stores'
import { ROUTE_NAME } from '@/utils'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export const RedirectToResetPassword = () => {
  const [isFirstRendering, setIsFirstRendering] = useState<boolean>(true)

  const handleVerifyForgotPassword = async () => {
    const { token } = URLSearchParamsService.get
    const result = await AuthService.instance.verifyForgotPassword({ forgotPasswordToken: token })
    if (result.success) {
      setIsFirstRendering(false)
    }
  }
  useEffect(() => {
    handleVerifyForgotPassword()
  }, [])
  if (isFirstRendering) return null
  console.log(ROUTE_NAME.RESET_PASSWORD_)
  return <Navigate to={ROUTE_NAME.RESET_PASSWORD_} />
}
