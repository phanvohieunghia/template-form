import { default as categoryData, default as typeData } from '@/assets/mock-data/pages/research/filter-category.json'
import FilterIcon from '@/assets/svgs/filter.svg'
import { Search, Select } from '@/components'
import { Result } from './SearchPage.Result'
import styles from './style.module.css'

export const SearchPage = () => {
  return (
    <div className=''>
      <div className='mx-auto max-w-[625px] pt-10 text-center'>
        <Search />
      </div>
      <div className='mx-auto mt-10 flex w-full max-w-screen-xl p-4'>
        <div className='w-[350px] pr-5'>
          <Filter />
        </div>
        <div className='flex-1'>
          <Result total={111} />
        </div>
      </div>
    </div>
  )
}

const Filter = () => {
  return (
    <>
      <div className={styles['title-1']}>
        <FilterIcon fontSize={28} stroke={'gray'} />
        <span>Lọc Kết quả</span>
      </div>
      <div className='mt-6 space-y-4'>
        <Select mode='multiple' options={categoryData} placeholder='Danh mục' className='w-full' />
        <Select mode='multiple' options={typeData} placeholder='Loại tài liệu' className='w-full' />
      </div>
    </>
  )
}
