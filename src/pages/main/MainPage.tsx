import sections from '@/assets/mock-data/search.json'
import SearchIcon from '@/assets/svgs/search.svg'
import { Button, Input, Popover, PopoverContentProps, TypeWriter } from '@/components'
import { useForm, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form'
import styles from './main.module.css'

type SearchInput = {
  search: string
}

export const MainPage = () => {
  const { register, handleSubmit, setValue } = useForm<SearchInput>({ defaultValues: { search: '' } })
  // const contentProps = {
  //   onSubmit: handleSubmit,
  //   setValue,
  // }

  return (
    <>
      <h1 className='space-y-4 p-4 text-center text-6xl'>
        <div className='font-bold text-gray-600'>
          Hệ thống <span className='text-green-600'>250.000+</span> biểu mẫu
        </div>
        <div>
          <TypeWriter words={['Toàn diện', 'Chính xác', 'Nhanh gọn']} />
        </div>
      </h1>
      <p className='m-6 text-center'>Được phát hành bởi các Luật sư và chuyên gia pháp luật</p>

      <div className='mx-auto mt-10 max-w-[625px] text-center'>
        <Popover content={<Content onSubmit={handleSubmit} setValue={setValue} />} trigger='click'>
          <Input
            {...register('search')}
            style={{ boxShadow: '0 14px 14px 0px #BFC5E040' }}
            size='large'
            placeholder='Bạn đang tìm văn bản nào?'
            extra={
              <Button icon={<SearchIcon />} className={styles['button-search']} type='primary'>
                Tìm ngay
              </Button>
            }
          />
        </Popover>
      </div>
    </>
  )
}

type ContentProps = {
  onSubmit: UseFormHandleSubmit<SearchInput>
  setValue: UseFormSetValue<SearchInput>
} & PopoverContentProps

const Content = (props: ContentProps) => {
  const { onSubmit, setValue, onClose = () => {} } = props

  const handleClick = (_data: SearchInput, text: string) => {
    setValue('search', text)
    onClose()
  }

  return (
    <div className='scroll-thin scrollbar-thin max-h-[300px] w-screen max-w-[625px] overflow-auto p-4'>
      {sections.map((item, index) => {
        return (
          <div key={index}>
            <div className='flex items-center'>
              <h2 className='text-sm font-semibold text-gray-300'>{item.title}</h2>
              <div className='ml-2 h-[1px] flex-1 bg-gray-300'></div>
            </div>
            <ul className='my-2'>
              {item.items.map((text, subIndex) => (
                <li
                  key={subIndex}
                  className='rounded-md px-2 py-1 font-medium text-gray-900 hover:bg-gray-200'
                  onClick={onSubmit((data) => handleClick(data, text))}
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
