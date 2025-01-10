import { MainLayout } from '@/layouts'
import { InputTestPage, MainPage, SearchPage, TestPage } from '@/pages'
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
        <Route path='tim-kiem' element={<SearchPage />} />
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
