import { Search, TypeWriter } from '@/components'

export const MainPage = () => {
  return (
    <>
      <h1 className='space-y-4 p-4 text-center text-6xl'>
        <div className='font-bold text-gray-600'>
          Hệ thống <span className='text-green-600'>250.000+</span> biểu mẫu
        </div>
        <div className='min-h-[60px]'>
          <TypeWriter words={['Toàn diện', 'Chính xác', 'Nhanh gọn']} className='text font-bold text-green-600' cursor={false} typeSpeed={100} />
        </div>
      </h1>
      <p className='m-6 text-center'>Được phát hành bởi các Luật sư và chuyên gia pháp luật</p>

      <div className='mx-auto max-w-[625px] pt-10 text-center'>
        <Search />
      </div>
    </>
  )
}
