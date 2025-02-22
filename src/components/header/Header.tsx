import BarsIcon from '@/assets/svgs/bars.svg'
import CloseIcon from '@/assets/svgs/close.svg'
import LogoutIcon from '@/assets/svgs/log_out.svg'
import { Avatar, Button, Drawer, Popover } from '@/components'
import { appConfig } from '@/configs'
import { UserInformationType } from '@/interfaces/localStorage'
import { LocalStorageService } from '@/services'
import { AuthService } from '@/stores'
import { LOCAL_STORAGE, ROUTE_NAME } from '@/utils'
import clsx from 'clsx'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PanelContent } from '../shared'

export const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const userInformation = (LocalStorageService.instance.get(LOCAL_STORAGE.USER_INFORMATION) as UserInformationType) ?? {}
  const [isDrawer, setToggleDrawer] = useState<boolean>(false)

  const handleLogin = () => {
    navigate(ROUTE_NAME.LOGIN_)
    setToggleDrawer(false)
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

  const renderRightHeader = () => {
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

  const renderButtonDrawer = () => {
    if (LocalStorageService.instance.get(LOCAL_STORAGE.ACCESS_TOKEN)) {
      return (
        <Button type='text' icon={<LogoutIcon fontSize={20} />} onClick={handleLogout} className='button-chat-panel py-3'>
          Đăng xuất
        </Button>
      )
    }
    return (
      <div className='mx-auto p-2'>
        <Button onClick={handleLogin} shape='circle' className='button-second !px-4 !py-2'>
          Đăng nhập
        </Button>
      </div>
    )
  }

  return (
    <header className='fixed left-0 right-0 top-0 z-50 items-center border-b'>
      <div
        className={clsx(
          'background-spring mx-auto flex min-h-[60px] w-full justify-between p-2 lg:min-h-20',
          pathname !== ROUTE_NAME.HOME && 'max-w-screen-lg',
        )}
      >
        <Link to={ROUTE_NAME.HOME} className='flex items-center'>
          <img src={appConfig.logo.logoWithText} alt='logo error' className='ml-20' />
        </Link>

        <div className='flex items-center lg:hidden'>
          <Button icon={<BarsIcon fontSize={30} />} shape='circle' type='text' onClick={() => setToggleDrawer(true)} />
        </div>
        <div className='hidden items-center space-x-1 lg:flex'>
          <Button type='text' shape='circle' className='!p-2'>
            Về chúng tôi
          </Button>
          <Button type='text' icon={<LogoutIcon fontSize={20} />} onClick={handleLogout} className='button-chat-panel py-3'>
            Đăng xuất
          </Button>

          {renderRightHeader()}
          <Drawer open={isDrawer} onClose={() => setToggleDrawer(false)} isShowHeader={false}>
            <div className='flex justify-end border-b-[1px] p-3'>
              <Button shape='circle' type='text' onClick={() => setToggleDrawer(false)}>
                <CloseIcon fontSize={24} />
              </Button>
            </div>
            <div className='flex h-[calc(100%-60px)] flex-col justify-between'>
              <PanelContent />
              {renderButtonDrawer()}
            </div>
          </Drawer>
        </div>
      </div>
    </header>
  )
}
