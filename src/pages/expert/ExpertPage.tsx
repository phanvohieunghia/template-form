import expertBioData from '@/assets/mock-data/expert.json'
import MoneyData from '@/assets/mock-data/pages/expert/money.json'
import LoadingIcon from '@/assets/svgs/loading.svg'
import { Button } from '@/components'
import { useAppSelector } from '@/hooks'
import { ExpertService } from '@/stores/expert'
import { ExpertUI } from '@/stores/expert/interfaces'
import { ROUTE_NAME } from '@/utils'
import clsx from 'clsx'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

export const ExpertPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { expertList } = useAppSelector((state) => state.expert)

  const fetchData = async () => {
    try {
      setLoading(true)

      await ExpertService.instance.getAll()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading)
    return (
      <div className='flex justify-center'>
        <LoadingIcon fontSize={80} fill='green' />
      </div>
    )

  if (!expertList.rows) return

  if (expertList.rows.length === 0) return <div className='text-center text-2xl text-gray-500'>No data</div>

  return (
    <>
      <div className='mb-6 flex items-end justify-between'>
        <h1 className='text-3xl font-bold text-gray-600'>Đội ngũ chuyên gia</h1>
        <span>{expertList.total} người</span>
      </div>
      <div className='flex flex-wrap justify-between gap-6'>
        {expertList.rows.map((expert, index) => {
          return <ProfileCard key={index} index={index} data={expert} />
        })}
      </div>
    </>
  )
}

type ProfileCardProps = {
  index: number
  data: ExpertUI
} & HTMLAttributes<HTMLDivElement>

const ProfileCard = (props: ProfileCardProps) => {
  const { index, data } = props
  const { user } = data
  const imageSrc = `src/assets/images/avatar/${index + 1}.png`
  const navigate = useNavigate()

  const makeAdvice = () => {
    ExpertService.instance.setSelectExpert(data, imageSrc, index)
    navigate(ROUTE_NAME.UPLOAD_FILE_)
  }

  return (
    <div className={clsx('relative w-full max-w-sm overflow-hidden rounded-xl bg-white p-6 shadow-lg')}>
      <div className={styles['background']}></div>
      <div className='relative flex justify-center'>
        <div className={clsx(styles['box-shadow'], 'h-24 w-24 overflow-hidden rounded-full')}>
          <img src={imageSrc} alt='Profile' className='h-full w-full object-cover' />
        </div>
      </div>

      <div className='relative mt-4 text-center'>
        <h2 className='text-xl font-bold text-gray-900'>{user.name}</h2>
        <p className='text-sm text-gray-600'>Chuyên gia tư vấn</p>
      </div>

      <div className='relative mt-6'>
        <h3 className='text-sm font-bold text-gray-700'>GIỚI THIỆU</h3>
        <p className='mt-2 text-sm text-gray-600'>{expertBioData[index]}</p>
      </div>

      <div className='relative mt-6 flex justify-center space-x-4'>
        <a href='#' className='text-gray-400 hover:text-blue-600' aria-label='Facebook'>
          <i className='fab fa-facebook-f'></i>
        </a>
        <a href='#' className='text-gray-400 hover:text-blue-400' aria-label='Twitter'>
          <i className='fab fa-twitter'></i>
        </a>
        <a href='#' className='text-gray-400 hover:text-purple-600' aria-label='Instagram'>
          <i className='fab fa-instagram'></i>
        </a>
        <a href='#' className='text-gray-400 hover:text-blue-700' aria-label='LinkedIn'>
          <i className='fab fa-linkedin-in'></i>
        </a>
      </div>
      <Button type='primary' block className='button-primary relative' onClick={makeAdvice}>
        <span className='text-md font-semibold'>Tư vấn:</span>
        {MoneyData[index].price}
      </Button>
    </div>
  )
}
