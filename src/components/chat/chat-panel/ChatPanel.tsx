import { PanelContent } from '@/components/shared'

export const ChatPenal = () => {
  return (
    <div className='animate-panel-out lg:animate-panel-in h-full w-[300px] overflow-auto rounded-lg bg-white'>
      <div className='py-2 text-center'>
        <PanelContent />
      </div>
    </div>
  )
}
