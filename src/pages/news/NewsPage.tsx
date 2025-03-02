import { Search } from '@/components'
import { useEffect, useState } from 'react'
import newsData from '@/assets/mock-data/pages/news/list.json'
import { LocalCard } from './Card'
import { News } from '../types'

export const NewsPage = () => {
  const [data, setData] = useState<News[]>()

  const fetchData = () => {
    setData(newsData)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='mt-10'>
      <div className='mx-auto max-w-[600px]'>
        <Search />
      </div>
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>{data && data.map((item) => <LocalCard data={item} />)}</div>
    </div>
  )
}
