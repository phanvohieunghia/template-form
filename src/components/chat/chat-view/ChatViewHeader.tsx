import AddUserIcon from '@/assets/svgs/add_user.svg'
import DotsIcon from '@/assets/svgs/dots.svg'
import SearchIcon from '@/assets/svgs/search.svg'
import { Avatar, Button } from '@/components'

export const ChatViewHeader = () => {
  return (
    <div className='flex justify-between border-b-[1px] p-3'>
      <div className='flex items-center gap-2'>
        <Avatar size={50}>N</Avatar>
        <div className='text-xl'>Noah</div>
      </div>
      <div className='flex items-center gap-2'>
        <Button type='text' shape='circle' icon={<AddUserIcon fontSize={18} />} />
        <Button type='text' shape='circle' icon={<SearchIcon fontSize={18} />} />
        <Button type='text' shape='circle' icon={<DotsIcon fontSize={18} />} />
      </div>
    </div>
  )
}
