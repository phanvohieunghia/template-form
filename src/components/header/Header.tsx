import LogoIcon from '@/assets/images/svgs/logo.svg'
import { Button } from '@/components'

export const Header = () => {
  return (
    <header className='mx-auto w-full max-w-[1280px]'>
      <div className='fixed left-0 right-0 top-0 flex justify-between border-b p-4'>
        <div className='flex items-center'>
          <LogoIcon fontSize={40} />
          <span className='text-xl'>MẪU VĂN BẢN</span>
        </div>
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
