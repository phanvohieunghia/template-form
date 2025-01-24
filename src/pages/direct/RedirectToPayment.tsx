import { MomoRedirectUrlVariables, PaymentService } from '@/stores'
import { getSearchParams } from '@/utils'
import { Navigate } from 'react-router-dom'

export const RedirectToPayment = () => {
  const params = getSearchParams()
  const convertedParams: MomoRedirectUrlVariables = {
    ...params,
    amount: +params.amount,
    responseTime: +params.responseTime,
    resultCode: +params.resultCode,
    transId: +params.transId,
  } as MomoRedirectUrlVariables
  console.log(params)

  PaymentService.instance.setInformation(convertedParams)

  return <Navigate to='/thanh-toan' />
}
