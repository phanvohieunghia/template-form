import CheckCircleIcon from '@/assets/svgs/check_circle.svg'
import CloseCircleIcon from '@/assets/svgs/close_circle.svg'
import { Button } from '@/components'
import { PaymentResponse, PaymentService } from '@/stores'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'

type StatusBillType = PaymentResponse['status'] | undefined

export const PaymentPage = () => {
  const navigate = useNavigate()
  const [statusBill, setStatusBill] = useState<StatusBillType>('SUCCESS')

  const fetchData = async () => {
    const result = await PaymentService.instance.getOne()
    if (result) {
      if (result.status) setStatusBill(result.status)
      else if (result.navigate) navigate(result.navigate)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  if (!statusBill) return null
  return (
    <div className='mt-10 flex min-h-screen items-start justify-center'>
      <Ticket statusBill={statusBill} />
    </div>
  )
}

type TicketType = {
  statusBill: StatusBillType
}

const Ticket = (props: TicketType) => {
  const { statusBill } = props

  return (
    <div className={clsx('relative w-full max-w-md rounded-t-xl p-6', styles['background'])}>
      {/* Top decorative shape */}
      <div className='flex justify-center pt-6'>
        <Icons type={statusBill} />
      </div>
      {/* Card Content */}
      <div className='relative mt-8 text-center'>
        <h2 className='text-2xl font-bold'>{statusBill === 'SUCCESS' ? 'Thanh Toán Thành Công' : 'Thanh Toán Không Thành Công'}</h2>
      </div>
      <div className='relative h-[100px]'></div>
      <div className={'space-y-4 p-6 text-sm'}>
        <div className='flex justify-between text-lg font-bold'>
          <span>Total</span>
          <span>10.000đ</span>
        </div>
      </div>
      <div className='h-[100px]'></div>
      <Button type='primary' block size='large' className='!border-green-600 !bg-green-600 hover:!border-green-500 hover:!bg-green-500'>
        Liên Hệ Chuyên Gia
      </Button>
      <div className='h-[40px]'></div>
    </div>
  )
}

const Icons = (props: { type: StatusBillType }) => {
  const { type } = props

  const renderIcon = (): { icon: JSX.Element; wrapperColor: string; backgroundColor: string } => {
    if (type === 'FAILED')
      return {
        icon: <CloseCircleIcon fontSize={32} fill='white' />,
        wrapperColor: 'bg-[#f1676720]',
        backgroundColor: 'from-red-300 to-red-500',
      }
    else if (type === 'SUCCESS')
      return {
        icon: <CheckCircleIcon fontSize={32} fill='white' />,
        wrapperColor: 'bg-[#67f18020]',
        backgroundColor: 'from-green-300 to-green-500',
      }
    return {
      icon: <></>,
      wrapperColor: '',
      backgroundColor: '',
    }
  }

  return (
    <div className={clsx('relative flex h-20 w-20 items-center justify-center rounded-full', renderIcon().wrapperColor)}>
      <div className={clsx('relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r', renderIcon().backgroundColor)}>
        {renderIcon().icon}
      </div>
    </div>
  )
}
