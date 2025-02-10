import ClipIcon from '@/assets/svgs/clip.svg'
import SendIcon from '@/assets/svgs/send.svg'
import { Button, Input } from '@/components'
import { ChatService } from '@/stores'
import { useState } from 'react'

export const ChatViewInput = () => {
  const [chatInput, setChatInput] = useState<string>('nhà đất')
  // const { roomId, updateMessage } = useChatConversation()

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value === '') setChatInput({ message: '', isDisabledButton: true })
  //   else setChatInput({ message: e.target.value, isDisabledButton: false })
  // }

  // const handleUserChat = () => {
  //   if (chatInput.message === '') return
  //   setChatInput(defaultViewInput)
  // }
  // useEffect(() => {
  //   setChatInput(defaultViewInput)
  // }, [roomId])

  // useEffect(() => {
  //   if (data?.createMessage) {
  //     updateMessage(data.createMessage)
  //   }
  // }, [data])
  const handleChat = async () => {
    setChatInput('')
    await ChatService.instance.chatOne({ chatInput: chatInput })
  }

  return (
    <div className='flex items-center gap-2 p-2'>
      <Input
        size='large'
        value={chatInput}
        extra={<Button shape='circle' type='text' icon={<ClipIcon fontSize={18} />} />}
        onChange={(e) => setChatInput(e.target.value)}
      />
      <Button shape='circle' type='primary' disabled={false} icon={<SendIcon />} className='button-primary' onClick={handleChat} />
    </div>
  )
}
