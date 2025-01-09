import SearchIcon from '@/assets/svgs/search.svg'
import { Button, Input, Popover, TypeWriter } from '@/components'
import styles from './main.module.css'

export const MainPage = () => {
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

      <div className='mx-auto mt-10 max-w-[625px] p-4 text-center'>
        <Popover content={content} trigger='click'>
          <Input
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

const content = (
  <div className='w-screen max-w-[625px] p-4'>
    <div className='border-b border-gray-200'>
      <h2 className='text-sm font-semibold text-gray-500'>Đầu tư & Kinh doanh</h2>
      <ul className='mt-1'>
        <li className='py-1 font-medium text-gray-900'>Price quotation form</li>
        <li className='py-1 font-medium text-gray-900'>Mẫu hợp đồng sang nhượng quán cafe, cà phê</li>
      </ul>
    </div>
    <div className='py-2'>
      <h2 className='text-sm font-semibold text-gray-500'>Doanh nghiệp & Doanh nhân</h2>
      <ul className='mt-1'>
        <li className='py-1 font-medium text-gray-900'>Conference invitation</li>
      </ul>
    </div>
  </div>
)
