import expertBioData from '@/assets/mock-data/expert.json'
import LoadingIcon from '@/assets/svgs/loading.svg'
import { useAppSelector } from '@/hooks'
import { ExpertService } from '@/stores/expert'
import { ExpertUI } from '@/stores/expert/interfaces'
import { Button } from 'antd'
import clsx from 'clsx'
import { HTMLAttributes, useEffect, useState } from 'react'
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

  return (
    <div className={clsx('relative w-full max-w-sm overflow-hidden rounded-xl bg-white p-6 shadow-lg')}>
      <div className={styles['background']}></div>
      {/* Profile Image */}
      <div className='relative flex justify-center'>
        <div className={clsx(styles['box-shadow'], 'h-24 w-24 overflow-hidden rounded-full')}>
          <img src={imageSrc} alt='Profile' className='h-full w-full object-cover' />
        </div>
      </div>

      {/* Name and Role */}
      <div className='relative mt-4 text-center'>
        <h2 className='text-xl font-bold text-gray-900'>{user.name}</h2>
        <p className='text-sm text-gray-600'>Chuyên gia tư vấn</p>
      </div>

      {/* About Section */}
      <div className='relative mt-6'>
        <h3 className='text-sm font-bold text-gray-700'>GIỚI THIỆU</h3>
        <p className='mt-2 text-sm text-gray-600'>{expertBioData[index]}</p>
      </div>

      {/* Social Media Links */}
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
      <Button type='primary' block className='!border-green-600 !bg-green-600 hover:!border-green-500 hover:!bg-green-500'>
        Tư vấn
      </Button>
      {/* Navigation */}
      {/* <div className='mt-6 border-t border-gray-200'>
        <div className='mt-4 flex justify-around text-sm text-gray-600'>
          <a href='#' className='hover:text-gray-900'>
            ABOUT
          </a>
          <a href='#' className='hover:text-gray-900'>
            EXPERIENCE
          </a>
          <a href='#' className='hover:text-gray-900'>
            CONTACT
          </a>
        </div>
      </div> */}
    </div>
  )
}
