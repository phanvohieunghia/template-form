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
import ChatIcon from '@/assets/svgs/chat.svg'

export const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const userInformation = (LocalStorageService.instance.get(LOCAL_STORAGE.USER_INFORMATION) as UserInformationType) ?? {}
  const [isDrawer, setToggleDrawer] = useState<boolean>(false)
  const [isPopover, setIsPopover] = useState<boolean>(false)

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

  const closePopover = () => {
    setIsPopover(false)
  }

  const content = (
    <div className='flex flex-col p-1'>
      <Button type='text' className='justify-start !pl-1' href={ROUTE_NAME.PROFILE_} onClick={closePopover}>
        <Avatar className='hover:cursor-pointer' src={userInformation?.avatar} size={40} shape='circle' />
        <div className='text-left'>
          <div className='font-bold'>{userInformation.name}</div>
          <div>Thông tin cá nhân</div>
        </div>
      </Button>
      <hr className='my-2' />
      <Button type='text' icon={<LogoutIcon />} onClick={handleLogout} className='justify-start'>
        Đăng xuất
      </Button>
    </div>
  )

  const renderLogin = () => {
    if (LocalStorageService.instance.get(LOCAL_STORAGE.ACCESS_TOKEN))
      return (
        <Popover content={content} zIndex={50} placement='bottomRight' width={220} open={isPopover} onChange={setIsPopover}>
          <Avatar className='hover:cursor-pointer' src={userInformation?.avatar} size={32} shape='circle' />
        </Popover>
      )
    return (
      <Button onClick={handleLogin} shape='circle' className='button-default bg-green-100 !p-2'>
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
    <header className='fixed left-0 right-0 top-0 z-50 items-center border-b bg-white'>
      <div className={clsx('mx-auto flex min-h-[60px] w-full justify-between p-2 lg:min-h-20', pathname !== ROUTE_NAME.CHAT_ && 'max-w-screen-lg')}>
        <Link to={ROUTE_NAME.HOME} className='flex items-center'>
          <img src={appConfig.logo.logoWithText} alt='logo error' />
        </Link>

        <div className='flex items-center lg:hidden'>
          <Button icon={<BarsIcon fontSize={30} />} shape='circle' type='text' onClick={() => setToggleDrawer(true)} />
        </div>

        <div className='flex items-center gap-2'>
          <Button type='text' shape='circle' className='!p-2'>
            Thủ tục hành chính
          </Button>
          <Button type='text' shape='circle' className='!p-2' href={ROUTE_NAME.NEWS_}>
            Tin tức
          </Button>
          <Button type='text' shape='circle' className='!p-2'>
            Câu hỏi thường gặp
          </Button>
        </div>

        <div className='flex items-center gap-3'>
          <div className='h-10 w-[1px] bg-gray-300'></div>
          <Button shape='circle' className='!p-2' href={ROUTE_NAME.CHAT_} icon={<ChatIcon />}>
            Tư vấn cùng AI
          </Button>

          {renderLogin()}

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
