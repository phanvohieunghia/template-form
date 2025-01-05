import SearchIcon from '@/assets/images/svgs/search.svg'
import { Button, Input, TypeWriter } from '@/components'

export const MainPage = () => {
  return (
    <div>
      <h1 className='space-y-4 p-4 text-center text-6xl'>
        <div className='font-bold text-gray-600'>
          Hệ thống <span className='text-green-600'>250.000+</span> biểu mẫu
        </div>
        <div>
          <TypeWriter words={['Toàn diện', 'Chính xác', 'Nhanh gọn']} />
        </div>
      </h1>
      <p className='m-6 text-center'>Được phát hành bởi các Luật sư và chuyên gia pháp luật</p>

      <div className='mx-auto mt-10 max-w-[500px] text-center'>
        <Input
          style={{ padding: 20 }}
          placeholder='Bạn đang tìm văn bản nào?'
          extra={
            <Button icon={<SearchIcon />} style={{ minWidth: 120 }}>
              Tìm ngay
            </Button>
          }
        />
      </div>
    </div>
  )
}
