import { FC, PropsWithChildren } from 'react'
import { Header } from '../components'

export const MainLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props
  return (
    <>
      <Header />
      <main className='mt-[73px]'>{children}</main>
    </>
  )
}
