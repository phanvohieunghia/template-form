import SendIcon from '@/assets/svgs/send.svg'
import { Button, Input } from '@/components'
import { ChatService } from '@/stores'
import { useState } from 'react'

export const ChatViewInput = () => {
  const [chatInput, setChatInput] = useState<string>('')

  const handleChat = async () => {
    setChatInput('')
    await ChatService.instance.chatOne({ message: chatInput })
  }

  return (
    <>
      <div className='mx-auto flex w-full max-w-[700px] items-center gap-2 p-2'>
        <div className='flex w-full gap-2 rounded-3xl bg-white p-2'>
          <Input
            size='large'
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onEnter={handleChat}
            placeholder='Nhập câu hỏi của bạn tại đây...'
            shape='round'
          />
          <Button
            shape='circle'
            type='primary'
            disabled={false}
            icon={<SendIcon fontSize={20} />}
            className='button-primary !px-[10px] !py-2'
            onClick={handleChat}
          />
        </div>
      </div>
      <div className='text-center text-[13px] text-[#A2ACC0]'>
        Thông tin được tạo ra bằng AI. Hãy luôn cẩn trọng và sử dụng thông tin AI một cách có trách nhiệm.
      </div>
    </>
  )
}
