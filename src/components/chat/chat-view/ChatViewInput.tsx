import ClipIcon from '@/assets/svgs/clip.svg'
import SendIcon from '@/assets/svgs/send.svg'
import SmileIcon from '@/assets/svgs/smile.svg'
import { Button, Input } from '@/components'

export const ChatViewInput = () => {
  // const [chatInput, setChatInput] = useState<Types>(defaultViewInput)
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

  return (
    <div className='flex items-center gap-2 p-2'>
      <Input
        size='large'
        extra={
          <>
            <Button shape='circle' type='text' icon={<ClipIcon fontSize={18} />} />
            <Button shape='circle' type='text' icon={<SmileIcon fontSize={18} />} />
          </>
        }
      />
      <Button shape='circle' type='primary' disabled={false} icon={<SendIcon />} />
    </div>
  )
}
