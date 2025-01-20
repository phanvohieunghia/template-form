import searchData from '@/assets/mock-data/search.json'
import SearchIcon from '@/assets/svgs/search.svg'
import { Button, Input, Popover, PopoverContentProps } from '@/components'
import { useURLSearchParams } from '@/hooks'
import { ProcedureService } from '@/stores'
import { useForm, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

type SearchInput = {
  search: string
}

export const Search = () => {
  const { register, handleSubmit, setValue, getValues } = useForm<SearchInput>({ defaultValues: { search: '' } })
  const { pathname } = useLocation()
  const { setParam } = useURLSearchParams()

  const navigate = useNavigate()

  const handleSearch = () => {
    const value = getValues('search')
    if (pathname.includes('tim-kiem')) {
      setParam('search', value)
      ProcedureService.instance.updateSearch(value)
    } else {
      navigate(`/tim-kiem/?search=${value}`)
    }
  }
  return (
    <Popover content={<Content onSubmit={handleSubmit} setValue={setValue} />} trigger='click'>
      <Input
        {...register('search')}
        style={{ boxShadow: '0 14px 14px 0px #BFC5E040' }}
        size='large'
        placeholder='Bạn đang tìm văn bản nào?'
        extra={
          <Button
            type='primary'
            icon={<SearchIcon />}
            onClick={handleSearch}
            className='mr-[3px] !min-w-[120px] !border-green-600 !bg-green-600 hover:!border-green-500 hover:!bg-green-500'
          >
            Tìm ngay
          </Button>
        }
      />
    </Popover>
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
      {searchData.map((item, index) => {
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
