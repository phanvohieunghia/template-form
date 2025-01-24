import CheckIcon from '@/assets/svgs/check.svg'
import { Button } from '@/components'
import clsx from 'clsx'
import styles from './style.module.css'

export const PaymentPage = () => {
  return (
    <div className='mt-10 flex min-h-screen items-start justify-center'>
      <div className={clsx('relative w-full max-w-md rounded-xl p-6', styles['background'])}>
        {/* Top decorative shape */}
        <div className='flex justify-center pt-6'>
          <div className='relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-2xl'>
            <CheckIcon fontSize={38} stroke={'white'} />
          </div>
        </div>
        {/* Card Content */}
        <div className='relative mt-10 text-center'>
          <h2 className='text-2xl font-bold'>Thanh Toán Thành Công</h2>
        </div>
        <div className='relative h-[100px]'></div>
        <div className={'space-y-4 p-6 text-sm'}>
          <div className='flex justify-between text-lg font-bold'>
            <span>Total</span>
            <span>10.000đ</span>
          </div>
        </div>
        <Button type='primary' block size='large' className='!border-green-600 !bg-green-600 hover:!border-green-500 hover:!bg-green-500'>
          Liên Hệ Chuyên Gia
        </Button>
        <div className='h-10'></div>
      </div>
    </div>
  )
}
