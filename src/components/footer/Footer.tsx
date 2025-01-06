import DMCAProtectedLogo from '@/assets/images/dmca-protected.webp'
import BoCongThuongLogo from '@/assets/images/logo-da-thong-bao-bo-cong-thuong.webp'
import LogoIcon from '@/assets/svgs/logo.svg'

export const Footer = () => {
  return (
    <footer className='bg-cyan-50'>
      <div className='mx-auto flex w-full max-w-screen-xl justify-between gap-10 p-4'>
        <div className='flex-1'>
          <div className='flex items-center'>
            <LogoIcon fontSize={40} />
            <span className='text-xl'>MẪU VĂN BẢN</span>
          </div>
          <p className='mt-4'>
            Chúng tôi hướng tới trở thành nền tảng biểu mẫu văn bản hàng đầu Việt Nam, mang đến giải pháp tìm kiếm và sử dụng biểu mẫu nhanh chóng,
            chính xác, giúp bạn xử lý công việc hiệu quả hơn.
          </p>
          <div className='mt-10 flex space-x-3'>
            <img style={{ width: 100, objectFit: 'contain' }} src={BoCongThuongLogo} alt='Da thong bao bo cong thuong' />
            <img style={{ width: 80, objectFit: 'contain' }} src={DMCAProtectedLogo} alt='DMCA Protected' />
          </div>
        </div>

        <div className='flex-1'>Liên hệ</div>
        <div className='flex-1'>Liên kết nhanh</div>
        <div className='flex-1'>Thông tin</div>
      </div>

      <div className='mx-auto border-t border-gray-300 py-5 text-center text-gray-700'>© 2024 MauVanBan.VN | Phát triển bởi Luật Thiên Mã</div>
    </footer>
  )
}
