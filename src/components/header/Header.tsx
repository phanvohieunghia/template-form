import LogoutIcon from '@/assets/svgs/log_out.svg'
import LogoIcon from '@/assets/svgs/logo.svg'
import { Button, Popover } from '@/components'
import { appConfig } from '@/configs'
import { LocalStorageService } from '@/services'
import { AuthService } from '@/stores'
import { LOCAL_STORAGE, ROUTE_NAME } from '@/utils'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '../avatar'

export const Header = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate(ROUTE_NAME.LOGIN_)
  }

  const handleLogout = async () => {
    const result = await AuthService.instance.logout()
    if (result.success && result.redirectTo) {
      navigate(result.redirectTo)
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
          <Avatar icon='T' size={32} />
        </Popover>
      )
    return <Button onClick={handleLogin}>Đăng nhập</Button>
  }

  return (
    <header className='fixed left-0 right-0 top-0 z-50 border-b bg-white'>
      <div className='mx-auto flex w-full max-w-screen-xl justify-between p-3'>
        <Link to='/' className='flex items-center'>
          <LogoIcon fontSize={40} />
          <span className='text-xl'>{appConfig.title}</span>
        </Link>
        <div className='space-x-1'>
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
