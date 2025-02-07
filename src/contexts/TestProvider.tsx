import { AutoClickService } from '@/services'
import { PropsWithChildren } from 'react'

export const TestProvider = (props: PropsWithChildren) => {
  const { children } = props
  // if(appConfig.)

  AutoClickService.instance
    .press(['F2'])
    // homepage
    .input({ tagName: 'body input' }, 'Nhà đất công')
    .click({ className: 'mr-[3px] !min-w-[120px] button-primary' })
    // research page
    .click({
      className:
        'ease rounded-lg border-[1px] border-transparent bg-transparent transition-[border-color,background-color] duration-300 hover:cursor-pointer hover:border-green-600 hover:bg-green-600',
    })
    .click({ tagName: '.noah .ant-collapse-header' })
    .click({ tagName: '.noah a' })
    .click({ className: ['modal', '.footer', 'button'] })
    // expert page
    .click({ className: 'relative button-primary' })
  //upload file page

  // LocalStorageService.instance.set(
  //   LOCAL_STORAGE.ACCESS_TOKEN,
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbTZ0NDYzNGMwMDAwYm1tbTNrM24xZGszIiwicm9sZSI6IlVTRVIiLCJleHAiOjE3Mzk3NzczMDMsInRva2VuVHlwZSI6IkFjY2Vzc1Rva2VuIiwiaWF0IjoxNzM4OTEzMzAzfQ.-7z3Ijdh1LMwIXUslEE7UYrsahgDaP5YIHf9gK_0xSM',
  // )
  // LocalStorageService.instance.set(
  //   LOCAL_STORAGE.REFRESH_TOKEN,
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbTZ0NDYzNGMwMDAwYm1tbTNrM24xZGszIiwicm9sZSI6IlVTRVIiLCJleHAiOjE3NDc1NTMzMDMsInRva2VuVHlwZSI6IlJlZnJlc2hUb2tlbiIsImlhdCI6MTczODkxMzMwM30.tNae2yJYIOWRlX1pOudbCMpUiQnSfbv84a9pIrwKv-g',
  // )
  return <>{children}</>
}
