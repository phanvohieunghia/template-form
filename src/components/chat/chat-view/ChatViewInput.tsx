import ClipIcon from '@/assets/svgs/clip.svg'
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
    <div className='flex items-center gap-2 p-2'>
      <Input
        size='large'
        value={chatInput}
        extra={<Button shape='circle' type='text' icon={<ClipIcon fontSize={18} />} />}
        onChange={(e) => setChatInput(e.target.value)}
        onEnter={handleChat}
        placeholder='Nhập câu hỏi của bạn tại đây...'
      />
      <Button shape='circle' type='primary' disabled={false} icon={<SendIcon />} className='button-primary' onClick={handleChat} />
    </div>
  )
}
