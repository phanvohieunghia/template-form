import { AutoClickService } from '@/services'
import { PropsWithChildren } from 'react'

export const TempProvider = (props: PropsWithChildren) => {
  const { children } = props

  AutoClickService.instance
    .press(['F2'])
    // homepage
    .input({ tagName: 'body input' }, 'Nhà đất công')
    .click({ className: 'mr-[3px] !min-w-[120px] !border-green-600 !bg-green-600 hover:!border-green-500 hover:!bg-green-500' })
    // research page
    .click({
      className:
        'ease rounded-lg border-[1px] border-transparent bg-transparent transition-[border-color,background-color] duration-300 hover:cursor-pointer hover:border-green-600 hover:bg-green-600',
    })
    .click({ tagName: '.noah .ant-collapse-header' })
    .click({ tagName: '.noah a' })
    .click({ className: ['modal', '.footer', 'button'] })
    // expert page
    .click({ className: 'relative !border-green-600 !bg-green-600 hover:!border-green-500 hover:!bg-green-500' })
  //upload file page
  return <>{children}</>
}
