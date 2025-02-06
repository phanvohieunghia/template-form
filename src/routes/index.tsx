import { MainLayout, PublicLayout } from '@/layouts'
import {
  DetailPage,
  ExpertPage,
  InputTestPage,
  LoginPage,
  MainPage,
  PaymentPage,
  RedirectOnGoogleAuthentication,
  RedirectToPayment,
  RegisterPage,
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
        path='/'
        element={
          <Authenticated type='token' fallback={<Navigate to={ROUTE_NAME.LOGIN_} />}>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </Authenticated>
        }
      >
        <Route index element={<MainPage />} />

        <Route path={ROUTE_NAME.RESEARCH}>
          <Route index element={<SearchPage />} />
          <Route path=':id' element={<DetailPage />} />
          <Route path='*' element={<Navigate to={ROUTE_NAME.RESEARCH_} />} />
        </Route>

        <Route path='chuyen-gia' element={<ExpertPage />} />
        <Route path='tai-len-tap-tin' element={<UploadPage />} />
        <Route path='thanh-toan' element={<PaymentPage />} />
        <Route path={ROUTE_NAME.REDIRECT.PAYMENT} element={<RedirectToPayment />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Route>

      <Route
        path='/'
        element={
          <Authenticated type='public' fallback={<Navigate to='/' />}>
            <PublicLayout>
              <Outlet />
            </PublicLayout>
          </Authenticated>
        }
      >
        <Route path={ROUTE_NAME.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_NAME.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTE_NAME.REDIRECT.GOOGLE} element={<RedirectOnGoogleAuthentication />} />
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
