import LogoutIcon from '@/assets/svgs/log_out.svg'
import { Avatar, Button, Drawer, Popover } from '@/components'
import { appConfig } from '@/configs'
import { UserInformationType } from '@/interfaces/localStorage'
import { LocalStorageService } from '@/services'
import { AuthService } from '@/stores'
import { LOCAL_STORAGE, ROUTE_NAME } from '@/utils'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()
  const userInformation = (LocalStorageService.instance.get(LOCAL_STORAGE.USER_INFORMATION) as UserInformationType) ?? {}
  const [isDrawer, setToggleDrawer] = useState<boolean>(false)

  const handleLogin = () => {
    navigate(ROUTE_NAME.LOGIN_)
  }

  const handleLogout = async () => {
    const result = await AuthService.instance.logout()
    if (result.success && result.redirectTo) {
      navigate(result.redirectTo)
    } else {
      navigate(ROUTE_NAME.LOGIN_)
    }
  }

  const content = (
    <div className='p-1'>
      <Button type='text' icon={<LogoutIcon />} onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  )

  const renderAuthentication = () => {
    if (LocalStorageService.instance.get(LOCAL_STORAGE.ACCESS_TOKEN))
      return (
        <Popover content={content} zIndex={50} placement='bottomRight'>
          <Avatar className='hover:cursor-pointer' src={userInformation?.avatar} size={32} shape='circle' />
        </Popover>
      )
    return (
      <Button onClick={handleLogin} shape='circle' className='button-default !p-2'>
        Đăng nhập
      </Button>
    )
  }

  return (
    <header className='fixed left-0 right-0 top-0 z-50 items-center border-b'>
      <div className='background-spring mx-auto flex min-h-20 w-full justify-between p-3'>
        <Link to={ROUTE_NAME.HOME} className='flex items-center'>
          <img src={appConfig.logo.logoWithText} alt='logo error' className='ml-20' />
        </Link>
        <div className='flex items-center space-x-1'>
          <Button onClick={() => setToggleDrawer(true)}>Test</Button>
          <Button type='text' shape='circle' className='!p-2'>
            Về chúng tôi
          </Button>

          {renderAuthentication()}
          <Drawer open={isDrawer} onClose={() => setToggleDrawer(false)} position='left'>
            Hello
          </Drawer>
        </div>
      </div>
    </header>
  )
}
