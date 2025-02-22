import { PanelContent } from '@/components/shared'

export const ChatPenal = () => {
  return (
    <div className='h-full w-0 -translate-x-full transform overflow-auto rounded-lg bg-white lg:w-[300px] lg:translate-x-0'>
      <div className='py-2 text-center'>
        <PanelContent />
      </div>
    </div>
  )
}
