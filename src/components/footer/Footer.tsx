import DMCAProtectedLogo from '@/assets/images/dmca-protected.webp'
import BoCongThuongLogo from '@/assets/images/logo-da-thong-bao-bo-cong-thuong.webp'
import logoWithTextSrc from '@/assets/images/logo-with-text.png'

export const Footer = () => {
  return (
    <footer className='bg-gray-50'>
      <div className='mx-auto flex w-full max-w-screen-xl justify-between gap-10 p-4'>
        <div className='flex-1'>
          <div className='flex items-center'>
            <img src={logoWithTextSrc} alt='logo error' height={32} />
          </div>
          <p className='mt-4'>
            Chúng tôi hướng tới trở thành nền tảng biểu mẫu văn bản hàng đầu Việt Nam, mang đến giải pháp tìm kiếm và sử dụng biểu mẫu nhanh chóng,
            chính xác, giúp bạn xử lý công việc hiệu quả hơn.
          </p>
          <div className='mt-10 flex space-x-3'>
            <img
              style={{ width: 100, objectFit: 'contain' as React.CSSProperties['objectFit'] }}
              src={BoCongThuongLogo}
              alt='Da thong bao bo cong thuong'
            />
            <img style={{ width: 80, objectFit: 'contain' as React.CSSProperties['objectFit'] }} src={DMCAProtectedLogo} alt='DMCA Protected' />
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
