import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { Footer, Header } from '../components'

export const MainLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props
  return (
    <>
      <Header />
      <main className={clsx('mx-auto w-full max-w-screen-xl p-4', 'mt-[73px] min-h-screen')}>{children}</main>
      <Footer />
    </>
  )
}
