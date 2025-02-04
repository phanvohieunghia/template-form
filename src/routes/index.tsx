import { MainLayout } from '@/layouts'
import { DetailPage, ExpertPage, InputTestPage, LoginPage, MainPage, PaymentPage, RedirectToPayment, SearchPage, TestPage, UploadPage } from '@/pages'
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Authenticated } from './Authenticated'

const RouteComponent = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Authenticated type='token' fallback={<Navigate to='/sign-in' />}>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </Authenticated>
        }
      >
        <Route index element={<MainPage />} />

        <Route path='tim-kiem'>
          <Route index element={<SearchPage />} />
          <Route path=':id' element={<DetailPage />} />
          <Route path='*' element={<Navigate to='/tim-kiem' />} />
        </Route>

        <Route path='chuyen-gia' element={<ExpertPage />} />
        <Route path='tai-len-tap-tin' element={<UploadPage />} />
        <Route path='thanh-toan' element={<PaymentPage />} />
        <Route path='checkout/notification' element={<RedirectToPayment />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Route>

      <Route
        path='dang-nhap'
        element={
          <Authenticated type='public' fallback={<Navigate to='/' />}>
            <LoginPage />
          </Authenticated>
        }
      />
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
