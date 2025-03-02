import ExampleImage from '@/assets/images/image.webp'
import ArrowRight from '@/assets/svgs/arrow_right.svg'
import { Link } from 'react-router-dom'
import { News } from '../types'

type CardType = {
  data: News
}

export const LocalCard = (props: CardType) => {
  const { data } = props
  return (
    <Link to={data.id} className='overflow-hidden rounded-lg bg-white'>
      <img src={ExampleImage} />
      <div className='px-4 py-2'>
        <div className='text-sm font-bold text-gray-400'>{data.category}</div>
        <h3 className='mt-1 line-clamp-2 text-xl'>{data.title}</h3>
        <p className='mt-2 line-clamp-6 h-[calc(24px*6)] max-h-[calc(24px*6)]'>{data.content}</p>
        <Link className='flex items-end gap-2 text-gray-500' to=''>
          Read more <ArrowRight fontSize={20} />
        </Link>
      </div>
    </Link>
  )
}
