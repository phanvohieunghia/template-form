import LogoIcon from '@/assets/svgs/logo.svg'
import { Button } from '@/components'
import { appConfig } from '@/configs'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='fixed left-0 right-0 top-0 z-50 border-b bg-white'>
      <div className='mx-auto flex w-full max-w-screen-xl justify-between p-4'>
        <Link to='/' className='flex items-center'>
          <LogoIcon fontSize={40} />
          <span className='text-xl'>{appConfig.title}</span>
        </Link>
        <div>
          <Button type='text' className='text-lg'>
            Về chúng tôi
          </Button>
          <Button type='text' className='text-lg'>
            Câu hỏi thường gặp
          </Button>
          <Button type='text' className='text-lg'>
            Tin tức
          </Button>
        </div>
      </div>
    </header>
  )
}
