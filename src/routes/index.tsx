import { MainLayout } from '@/layouts'
import { DetailPage, ExpertPage, InputTestPage, MainPage, PaymentPage, SearchPage, TestPage, UploadPage } from '@/pages'
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const RouteComponent = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      >
        <Route index element={<MainPage />} />
        <Route path='tim-kiem'>
          <Route index element={<SearchPage />} />
          <Route path=':id' element={<DetailPage />} />
        </Route>
        <Route path='chuyen-gia' element={<ExpertPage />} />
        <Route path='tai-len-tap-tin' element={<UploadPage />} />
        <Route path='thanh-toan' element={<PaymentPage />} />

        <Route path='test' element={<TestPage />} />
        <Route path='test-input' element={<InputTestPage />} />
      </Route>
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
