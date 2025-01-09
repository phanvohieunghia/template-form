import { Button } from '@/components'
import { EVENT_NAME, EventManager } from '@/utils'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { BaseModal } from '../base'

type State = {
  isOpen: boolean
  isActive: boolean
  data: TestModalPayload | undefined
}

export type TestModalPayload = {
  title: string
  content: string
}

export const TestModal = () => {
  const [modalState, setModalState] = useState<State>({ isOpen: false, isActive: false, data: undefined })

  const openModal = (payload: CustomEvent<TestModalPayload>) => {
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
          <BaseModal active={modalState.isActive} maskClosable escKeyboard>
            <BaseModal.Header title={modalState.data?.title || ''} onClose={closeModal} />
            <BaseModal.Body>{modalState.data?.content}</BaseModal.Body>
            <BaseModal.Footer>
              <Footer closeModal={closeModal} />
            </BaseModal.Footer>
          </BaseModal>,
          document.body,
        )}
    </>
  )
}

const Footer = (props: { closeModal: () => void }) => {
  const { closeModal } = props

  return (
    <div className='flex justify-end space-x-2'>
      <Button onClick={closeModal}>Cancel</Button>
      <Button type='primary'>OK</Button>
    </div>
  )
}
