import { getSearchParams } from '@/utils'
import { Navigate } from 'react-router-dom'

export const RedirectToPayment = () => {
  const params = getSearchParams()
  console.log(params)
  return <Navigate to='/thanh-toan' />
}
