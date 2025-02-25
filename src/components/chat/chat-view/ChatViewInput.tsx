import SendIcon from '@/assets/svgs/send.svg'
import { Button, Input } from '@/components'
import { ChatService } from '@/stores'
import { ChatOneVariables } from '@/stores/chat/interfaces'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ChatViewInput = () => {
  // const [chatInput, setChatInput] = useState<string>('');
  
  const [chatInput, setChatInput] = useState<ChatOneVariables>({
    message: "",
    sessionId: uuidv4()
  });

  const handleChat = async () => {
    await ChatService.instance.chatOne({
      message: chatInput.message,
      sessionId: chatInput.sessionId
    })
    setChatInput({
      ...chatInput,
      message: "",
    })
  }

  return (
    <>
      <div className='mx-auto flex w-full max-w-[700px] items-center gap-2 p-2'>
        <div className='flex w-full gap-2 rounded-3xl bg-white p-2'>
          <Input
            size='large'
            value={chatInput.message}
            onChange={(e) => setChatInput({
              ...chatInput,
              message: e.target.value
            })}
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
      <div className='hidden text-center text-[13px] text-[#A2ACC0] lg:block'>
        Thông tin được tạo ra bằng AI. Hãy luôn cẩn trọng và sử dụng thông tin AI một cách có trách nhiệm.
      </div>
    </>
  )
}
