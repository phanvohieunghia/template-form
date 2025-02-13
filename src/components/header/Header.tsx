import loginLink from '@/assets/images/logo.png'
import LogoutIcon from '@/assets/svgs/log_out.svg'
import { Avatar, Button, Popover } from '@/components'
import { UserInformationType } from '@/interfaces/localStorage'
import { LocalStorageService } from '@/services'
import { AuthService } from '@/stores'
import { LOCAL_STORAGE, ROUTE_NAME } from '@/utils'
import { Link, useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()
  const userInformation = (LocalStorageService.instance.get(LOCAL_STORAGE.USER_INFORMATION) as UserInformationType) ?? {}
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
    return <Button onClick={handleLogin}>Đăng nhập</Button>
  }

  return (
    <header className='fixed left-0 right-0 top-0 z-50 items-center border-b bg-white'>
      <div className='mx-auto flex min-h-20 w-full max-w-screen-xl justify-between p-3'>
        <Link to={ROUTE_NAME.HOME} className='flex items-center'>
          <img src={loginLink} alt='logo error' />
        </Link>
        <div className='flex items-center space-x-1'>
          <Button type='text' className='text-lg'>
            Về chúng tôi
          </Button>
          <Button type='text' className='text-lg'>
            Câu hỏi thường gặp
          </Button>
          <Button type='text' className='text-lg'>
            Tin tức
          </Button>
          {renderAuthentication()}
        </div>
      </div>
    </header>
  )
}
