import { Button } from '@/components'
import { EVENT_NAME, EventManager } from '@/utils'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { BaseModal } from '../base'

type State = {
  isOpen: boolean
  isActive: boolean
  data: ExpertAdviceModal | undefined
}

export type ExpertAdviceModal = {
  title: string
  content: string | React.ReactNode
  onConfirm: () => void
}

export const ExpertAdviceModal = () => {
  const [modalState, setModalState] = useState<State>({ isOpen: false, isActive: false, data: undefined })

  const openModal = (payload: CustomEvent<ExpertAdviceModal>) => {
    setModalState((prev) => ({ ...prev, isOpen: true, isActive: true, data: payload.detail }))
  }

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isActive: false }))
  }

  useEffect(() => {
    EventManager.on(EVENT_NAME.TEST_MODAL_OPEN, openModal)
    EventManager.on(EVENT_NAME.TEST_MODAL_CLOSE, closeModal)

    return () => {
      EventManager.off(EVENT_NAME.TEST_MODAL_OPEN, openModal)
      EventManager.off(EVENT_NAME.TEST_MODAL_CLOSE, closeModal)
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
      <Button type='primary' onClick={handleClickButton} className='!border-green-600 !bg-green-600 hover:!border-green-500 hover:!bg-green-500'>
        Gợi ý chuyên gia
      </Button>
    </div>
  )
}
