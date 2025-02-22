import { Avatar, Button, Input } from '@/components'
import { Card } from '@/components/card'
import PenIcon from '@/assets/svgs/pen.svg'
import { LocalStorageService } from '@/services'
import { LOCAL_STORAGE } from '@/utils'
import { UserInformationType } from '@/interfaces'

const titleStyleCommon = 'text-gray-400 font-semibold'

export const ProfilePage = () => {
  const userInformation = (LocalStorageService.instance.get(LOCAL_STORAGE.USER_INFORMATION) as UserInformationType) ?? {}

  return (
    <div>
      <Card>
        <Card>
          <div className='flex items-start justify-between gap-4 p-2 pr-0'>
            <div className='flex items-center justify-between gap-4'>
              <Avatar src={userInformation.avatar} size={80} />
              <div className='text-lg font-bold'>{userInformation.name}</div>
            </div>
            <Button icon={<PenIcon fontSize={20} />} shape='circle' className='!px-3'>
              Sửa
            </Button>
          </div>
        </Card>
        <div className='h-4'></div>
        <Card>
          <div className='flex items-start justify-between'>
            <div className='space-y-4'>
              <h2 className='mb-2 text-xl font-semibold'>Thông tin cá nhân</h2>
              <Input title='Email' readonly value={userInformation.email ?? '-'} titleClassName={titleStyleCommon} />
              <Input title='Giới thiệu bản thân' readonly value={'-'} titleClassName={titleStyleCommon} />
            </div>
            <Button icon={<PenIcon fontSize={20} />} shape='circle' className='!px-3'>
              Sửa
            </Button>
          </div>
        </Card>
        <div className='h-4'></div>
        <Card>
          <div className='flex items-start justify-between'>
            <div className='space-y-4'>
              <h2 className='mb-2 text-xl font-semibold'>Thông tin cá nhân</h2>
              <Input title='Số định danh cá nhân' readonly value={'xxx-xxx-xxx-xxx'} titleClassName={titleStyleCommon} />
              <Input title='Họ và tên' readonly value={'-'} titleClassName={titleStyleCommon} />
              <Input title='Giới tính' readonly value={'-'} titleClassName={titleStyleCommon} />
              <Input title='Ngày sinh' readonly value={'__ / __ / __'} titleClassName={titleStyleCommon} />
              <Input title='Số điện thoại' readonly value={'-'} titleClassName={titleStyleCommon} />
              <Input title='Nơi thường trú' readonly value={'-'} titleClassName={titleStyleCommon} />
            </div>
            <Button icon={<PenIcon fontSize={20} />} shape='circle' className='!px-3'>
              Sửa
            </Button>
          </div>
        </Card>
      </Card>
    </div>
  )
}
