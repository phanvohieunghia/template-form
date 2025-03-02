import { ROUTE_NAME } from '@/utils'
import clsx from 'clsx'
import { FC, PropsWithChildren, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Footer, Header } from '../components'

export const MainLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const { pathname } = useLocation()

  const renderFrameCenter = () => {
    const s = pathname
    if (s.includes(ROUTE_NAME.LOGIN_) || s.includes(ROUTE_NAME.REGISTER_) || s.includes(ROUTE_NAME.FORGOT_PASSWORD_)) {
      return 'flex items-center justify-center'
    }
  }

  const renderBackground = () => {
    switch (pathname) {
      case ROUTE_NAME.CHAT_:
        return 'background-chat'
      case ROUTE_NAME.NEWS_:
        return 'bg-gray-100'
      default:
        return 'bg-white'
    }
  }

  const renderLayout = () => {
    const chatLayoutCondition = pathname === ROUTE_NAME.CHAT_ ? 'h-dvh' : 'max-w-screen-lg'
    return clsx(chatLayoutCondition, 'min-h-dvh')
  }
  const backgroundStyle = useMemo(() => {
    const s = pathname
    if (s.includes(ROUTE_NAME.PROFILE_)) return 'bg-[#fbfaf9]'
  }, [])

  return (
    <>
      <Header />
      <main className={clsx(backgroundStyle, renderBackground())}>
        <div className={clsx('mx-auto w-full p-2 pt-[calc(61px+8px)] lg:p-4 lg:pt-[calc(81px+16px)]', renderLayout(), renderFrameCenter())}>
          {children}
        </div>
      </main>
      {pathname !== ROUTE_NAME.CHAT_ && <Footer />}
    </>
  )
}
