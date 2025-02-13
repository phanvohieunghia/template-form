import { MainLayout } from '@/layouts'
import {
  ChatPage,
  DetailPage,
  ExpertPage,
  ForgotPasswordPage,
  InputTestPage,
  LoginPage,
  PaymentPage,
  RedirectOnGoogleAuthentication,
  RedirectToPayment,
  RedirectToResetPassword,
  RegisterPage,
  ResetPasswordPage,
  SearchPage,
  TestPage,
  UploadPage,
} from '@/pages'
import { ROUTE_NAME } from '@/utils'
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Authenticated } from './Authenticated'

const RouteComponent = () => {
  return (
    <Routes>
      <Route
        path={ROUTE_NAME.HOME}
        element={
          <Authenticated type='token' fallback={<Navigate to={ROUTE_NAME.LOGIN_} />}>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </Authenticated>
        }
      >
        <Route path={ROUTE_NAME.RESEARCH}>
          <Route index element={<SearchPage />} />
          <Route path=':id' element={<DetailPage />} />
          <Route path='*' element={<Navigate to={ROUTE_NAME.RESEARCH_} />} />
        </Route>

        <Route path={ROUTE_NAME.CHAT} element={<ChatPage />} />
        <Route path={ROUTE_NAME.EXPERT} element={<ExpertPage />} />
        <Route path={ROUTE_NAME.UPLOAD_FILE} element={<UploadPage />} />
        <Route path={ROUTE_NAME.PAYMENT} element={<PaymentPage />} />
        <Route path={ROUTE_NAME.REDIRECT.PAYMENT} element={<RedirectToPayment />} />
        <Route path='*' element={<Navigate to={ROUTE_NAME.HOME} />} />
      </Route>

      <Route
        path={ROUTE_NAME.HOME}
        element={
          <Authenticated type='public' fallback={<Navigate to={ROUTE_NAME.HOME} />}>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </Authenticated>
        }
      >
        <Route index element={<ChatPage />} />

        <Route path={ROUTE_NAME.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_NAME.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTE_NAME.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTE_NAME.RESET_PASSWORD} element={<ResetPasswordPage />} />

        <Route path={ROUTE_NAME.REDIRECT.GOOGLE} element={<RedirectOnGoogleAuthentication />} />
        <Route path={ROUTE_NAME.REDIRECT.RESET_PASSWORD} element={<RedirectToResetPassword />} />
      </Route>

      <Route path='test' element={<TestPage />} />
      <Route path='test-input' element={<InputTestPage />} />
    </Routes>
  )
}

export const BaseRoutes = () => {
  return (
    <Router>
      <RouteComponent />
    </Router>
  )
}
