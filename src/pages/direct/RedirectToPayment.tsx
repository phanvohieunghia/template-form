import { MomoRedirectUrlVariables, PaymentService } from '@/stores'
import { getSearchParams, ROUTE_NAME } from '@/utils'
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

  PaymentService.instance.setInformation(convertedParams)

  return <Navigate to={ROUTE_NAME.PAYMENT_} />
}
