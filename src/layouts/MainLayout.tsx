import { ROUTE_NAME } from '@/utils'
import clsx from 'clsx'
import { FC, PropsWithChildren, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components'

export const MainLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const { pathname } = useLocation()

  const renderClass = () => {
    const s = pathname
    if (s.includes(ROUTE_NAME.LOGIN_) || s.includes(ROUTE_NAME.REGISTER_) || s.includes(ROUTE_NAME.FORGOT_PASSWORD_)) {
      return 'flex items-center justify-center'
    }
  }
  const backgroundStyle = useMemo(() => {
    const s = pathname
    if (s.includes(ROUTE_NAME.PROFILE_)) return 'bg-[#fbfaf9] '
  }, [])

  return (
    <>
      <Header />
      <main className={backgroundStyle}>
        <div
          className={clsx(
            'mx-auto w-full p-2 pt-[calc(61px+8px)] lg:p-4 lg:pt-[calc(81px+16px)]',
            pathname === ROUTE_NAME.HOME ? 'background-chat h-dvh' : 'h-screen max-w-screen-lg',
            renderClass(),
          )}
        >
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}
