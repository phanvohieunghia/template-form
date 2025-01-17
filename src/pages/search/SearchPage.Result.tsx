import SearchResultData from '@/assets/mock-data/search-result.json'
import FileIcon from '@/assets/svgs/file.svg'
import { Pagination } from '@/components'
import { FC, HTMLAttributes } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'

type SearchResultResults = (typeof SearchResultData)[0]
type Props = {
  total: number
}
export const Result = (props: Props) => {
  const { total } = props
  const navigate = useNavigate()

  const handleClick = (data: SearchResultResults) => {
    navigate(`/tim-kiem/${data.title.replace(' ', '-')}-i.${data.id}`)
  }

  return (
    <div>
      <div className='flex items-end justify-between'>
        <div className={styles['title-1']}>
          <FileIcon fontSize={28} stroke={'gray'} />
          <span>Kết quả tìm kiếm</span>
        </div>
        <span className='text-sm text-gray-400'>{total} kết quả</span>
      </div>
      <div className='mt-6 flex flex-col gap-4'>
        {SearchResultData.map((item, index) => {
          return <Item data={item} key={index} onClick={() => handleClick(item)} />
        })}
      </div>
      <div className='mt-4 flex justify-center'>
        <Pagination total={60} />
      </div>
    </div>
  )
}

type ItemProps = {
  data: SearchResultResults
} & HTMLAttributes<HTMLDivElement>

const Item: FC<ItemProps> = (props) => {
  const { data, ...restProps } = props
  const { category, code, image, title } = data
  return (
    <div className='overflow-hidden rounded-lg border-[1px] border-transparent hover:cursor-pointer hover:border-green-600' {...restProps}>
      <div className='flex gap-3 rounded-lg border-[1px] border-green-600 p-4'>
        <div className='h-[100px] w-[200px] overflow-hidden rounded-lg border-[1px] border-green-300'>
          <img src={image} alt={title} />
        </div>
        <div className='flex flex-1 flex-col justify-center gap-1'>
          <div className='text-xs text-green-400'>{category}</div>
          <div className='text-xl'>{title}</div>
          <div className='text-gray-500'>Mã tài liệu: {code}</div>
        </div>
      </div>
    </div>
  )
}
