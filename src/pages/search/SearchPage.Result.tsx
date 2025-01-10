import SearchResultData from '@/assets/mock-data/search-result.json'
import FileIcon from '@/assets/svgs/file.svg'
import styles from './style.module.css'

type SearchResultResults = (typeof SearchResultData)[0]
type Props = {
  total: number
}
export const Result = (props: Props) => {
  const { total } = props
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
        {SearchResultData.map((item) => {
          return <Item data={item} />
        })}
      </div>
    </div>
  )
}
type ItemProps = {
  data: SearchResultResults
}
const Item = (props: ItemProps) => {
  const { data } = props
  const { category, code, image, title } = data
  return (
    <div className='overflow-hidden rounded-lg border-[1px] border-transparent hover:cursor-pointer hover:border-green-600'>
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
