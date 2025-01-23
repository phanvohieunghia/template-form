import CheckIcon from '@/assets/svgs/check.svg'
import clsx from 'clsx'
import styles from './style.module.css'

const ticketCut = {
  width: 'w-10',
  height: 'h-10',
}

export const PaymentPage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div
        className='relative w-full max-w-md rounded-xl'
        style={{
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        }}
      >
        {/* Top decorative shape */}
        <div className='flex justify-center px-6 pt-6'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-lg'>
            <CheckIcon fontSize={38} stroke={'white'} />
          </div>
        </div>

        {/* Card Content */}
        <div className='mt-10 px-6 text-center'>
          <h2 className='text-xl font-bold'>Thanh toán thành công</h2>
        </div>

        <div className={clsx('mt-6 space-y-4 px-6 text-sm', styles['background'])}>
          <div className='flex justify-between border-b border-gray-500 pb-2'>
            <span>Reference number</span>
            <span className='font-medium'>000085752257</span>
          </div>
          <div className='flex justify-between border-b border-gray-500 pb-2'>
            <span>Date & time</span>
            <span className='font-medium'>22 Mar 2024, 07:43 AM</span>
          </div>
          <div className='flex justify-between border-b border-gray-500 pb-2'>
            <span>Payment method</span>
            <span className='font-medium'>Credit Card</span>
          </div>
          <div className='flex justify-between border-b border-gray-500 pb-2'>
            <span>Subtotal</span>
            <span className='font-medium'>$480.00</span>
          </div>
          <div className='flex justify-between border-b border-gray-500 pb-2'>
            <span>Discount</span>
            <span className='font-medium'>$10.00</span>
          </div>
          <div className='flex justify-between text-lg font-bold'>
            <span>Total</span>
            <span>$470.00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
