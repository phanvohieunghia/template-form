import { AutoClickService, LocalStorageService } from '@/services'
import { LOCAL_STORAGE } from '@/utils'
import { PropsWithChildren } from 'react'

export const TempProvider = (props: PropsWithChildren) => {
  const { children } = props
  LocalStorageService.instance.set(
    LOCAL_STORAGE.ACCESS_TOKEN,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbTY1YmllczYwMDAwd2p3czFtejRzdmJvIiwicm9sZSI6IlVTRVIiLCJleHAiOjE3Mzg0MDY0MDAsInRva2VuVHlwZSI6IkFjY2Vzc1Rva2VuIiwiaWF0IjoxNzM3NTQyNDAwfQ.JqsTOF5zuI9NiFZOKWP3ggquxV2p9Ay0WGszwQuLc1k',
  )
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
    .click({ tagName: '.noah button' })
    .click({ className: ['modal', '.footer', 'button'] })
    // expert page
    .click({ className: 'relative !border-green-600 !bg-green-600 hover:!border-green-500 hover:!bg-green-500' })
  //upload file page
  return <>{children}</>
}
