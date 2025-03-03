import { MainLayout } from '@/layouts'
import { RedirectOnGoogleAuthentication, RedirectToPayment, RedirectToResetPassword } from '@/pages'
import { ROUTE_NAME } from '@/utils'
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Authenticated } from './Authenticated'
import { ProfilePage } from '@/pages/profile'
import { lazy } from 'react'

const ChatPage = lazy(() => import('../pages/chat/ChatPage'))
const TaxCodePage = lazy(() => import('../pages/tax-code/TaxCodePage'))
const NewsPage = lazy(() => import('../pages/news/NewsPage'))
const MainPage = lazy(() => import('../pages/main/MainPage'))
const NewsDetailPage = lazy(() => import('../pages/news-detail/NewsDetailPage'))
const SearchPage = lazy(() => import('../pages/search/SearchPage'))
const UploadPage = lazy(() => import('../pages/upload/UploadPage'))
const RegisterPage = lazy(() => import('../pages/register/RegisterPage'))
const ResetPasswordPage = lazy(() => import('../pages/reset-password/ResetPasswordPage'))
const TestPage = lazy(() => import('../pages/test/TestPage.tsx'))
const SearchDetailPage = lazy(() => import('../pages/search-detail/SearchDetailPage.tsx'))
const ExpertPage = lazy(() => import('../pages/expert/ExpertPage.tsx'))
const LoginPage = lazy(() => import('../pages/test/TestPage.tsx'))
const ForgotPasswordPage = lazy(() => import('../pages/forgot-password/ForgotPasswordPage.tsx'))
const PaymentPage = lazy(() => import('../pages/payment/PaymentPage.tsx'))

const RouteComponent = () => {
  return (
    <Routes>
      <Route
        path={ROUTE_NAME.HOME}
        element={
          <Authenticated type='both'>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </Authenticated>
        }
      >
        <Route index element={<MainPage />} />
        <Route path={ROUTE_NAME.CHAT} element={<ChatPage />} />
        <Route path={ROUTE_NAME.CODE_TAX} element={<TaxCodePage />} />

        <Route path={ROUTE_NAME.NEWS}>
          <Route index element={<NewsPage />} />
          <Route path=':id' element={<NewsDetailPage />} />
          <Route path='*' element={<Navigate to={ROUTE_NAME.NEWS_} />} />
        </Route>

        <Route path={ROUTE_NAME.RESEARCH}>
          <Route index element={<SearchPage />} />
          <Route path=':id' element={<SearchDetailPage />} />
          <Route path='*' element={<Navigate to={ROUTE_NAME.RESEARCH_} />} />
        </Route>
      </Route>

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
        <Route path={ROUTE_NAME.PROFILE} element={<ProfilePage />} />
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
        <Route path={ROUTE_NAME.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_NAME.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTE_NAME.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTE_NAME.RESET_PASSWORD} element={<ResetPasswordPage />} />

        <Route path={ROUTE_NAME.REDIRECT.GOOGLE} element={<RedirectOnGoogleAuthentication />} />
        <Route path={ROUTE_NAME.REDIRECT.RESET_PASSWORD} element={<RedirectToResetPassword />} />
      </Route>

      <Route path='test' element={<TestPage />} />
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
