import { Button } from '@/components'
import { EVENT_NAME, EventManager } from '@/utils'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { BaseModal } from '../base'

type State = {
  isOpen: boolean
  isActive: boolean
  data: ExpertAdviceModalPayload | undefined
}

export type ExpertAdviceModalPayload = {
  title: string
  content: string | React.ReactNode
  onConfirm: () => void
}

export const ExpertAdviceModal = () => {
  const [modalState, setModalState] = useState<State>({ isOpen: false, isActive: false, data: undefined })

  const openModal = (payload: CustomEvent<ExpertAdviceModalPayload>) => {
    setModalState((prev) => ({ ...prev, isOpen: true, isActive: true, data: payload.detail }))
  }

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isActive: false }))
  }

  useEffect(() => {
    EventManager.on(EVENT_NAME.EXPERT_ADVICE.OPEN, openModal)
    EventManager.on(EVENT_NAME.EXPERT_ADVICE.CLOSE, closeModal)

    return () => {
      EventManager.off(EVENT_NAME.EXPERT_ADVICE.OPEN, openModal)
      EventManager.off(EVENT_NAME.EXPERT_ADVICE.CLOSE, closeModal)
    }
  }, [])

  return (
    <>
      {modalState.isOpen &&
        createPortal(
          <BaseModal active={modalState.isActive} escKeyboard className='z-50'>
            <BaseModal.Header title={modalState.data?.title || ''} onClose={closeModal} className='text-xl font-semibold' />
            <BaseModal.Body>
              <div className='text-center'>{modalState.data?.content}</div>
            </BaseModal.Body>
            <BaseModal.Footer>
              <Footer closeModal={closeModal} onConfirm={modalState.data?.onConfirm} />
            </BaseModal.Footer>
          </BaseModal>,
          document.body,
        )}
    </>
  )
}

const Footer = (props: { closeModal: () => void; onConfirm?: () => void }) => {
  const { closeModal, onConfirm } = props
  const handleClickButton = () => {
    closeModal()
    if (onConfirm) onConfirm()
  }
  return (
    <div className='flex justify-center'>
      <Button type='primary' onClick={handleClickButton} className='button-primary'>
        Gợi ý chuyên gia
      </Button>
    </div>
  )
}
