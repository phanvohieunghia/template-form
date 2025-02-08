import CheckIcon from '@/assets/svgs/check.svg'
import { Button } from '@/components'
import { EVENT_NAME, EventManager, ROUTE_NAME } from '@/utils'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { BaseModal } from '../base'

type State = {
  isOpen: boolean
  isActive: boolean
  data: AlertSuccessfulModalPayload | undefined
}

export type AlertSuccessfulModalPayload = {
  content: string | React.ReactNode
  buttonText: string
  onSubmit: () => void
}

export const AlertSuccessfulModal = () => {
  const [state, setState] = useState<State>({ isOpen: false, isActive: false, data: undefined })

  const openModal = (payload: CustomEvent<AlertSuccessfulModalPayload>) => {
    setState((prev) => ({ ...prev, isOpen: true, isActive: true, data: payload.detail }))
  }

  const closeModal = () => {
    setState((prev) => ({ ...prev, isActive: false }))
    setTimeout(() => {
      if (state.data?.onSubmit) state.data.onSubmit()
    }, 300)
  }

  useEffect(() => {
    EventManager.on(EVENT_NAME.ALERT_SUCCESSFUL.OPEN, openModal)
    EventManager.on(EVENT_NAME.ALERT_SUCCESSFUL.CLOSE, closeModal)

    return () => {
      EventManager.off(EVENT_NAME.ALERT_SUCCESSFUL.OPEN, openModal)
      EventManager.off(EVENT_NAME.ALERT_SUCCESSFUL.CLOSE, closeModal)
    }
  }, [])

  return (
    <>
      {state.isOpen &&
        createPortal(
          <BaseModal active={state.isActive} escKeyboard className='z-50'>
            <BaseModal.Body className='rounded-t-lg'>
              <div>
                <div className='my-4 flex items-center justify-center'>
                  <div className='flex h-[80px] w-[80px] items-center justify-center rounded-full bg-green-100'>
                    <CheckIcon fontSize={40} stroke={'green'} />
                  </div>
                </div>
                <p className='mb-6 text-gray-600'>{state.data?.content}</p>
              </div>
            </BaseModal.Body>
            <BaseModal.Footer>
              <Footer closeModal={closeModal} buttonText={state.data?.buttonText ?? ''} />
            </BaseModal.Footer>
          </BaseModal>,
          document.body,
        )}
    </>
  )
}

type FooterType = {
  closeModal: () => void
  buttonText: string
}

const Footer = (props: FooterType) => {
  const navigate = useNavigate()
  const { closeModal, buttonText } = props

  const handleClickButton = () => {
    closeModal()
    setTimeout(() => {
      navigate(ROUTE_NAME.LOGIN_)
    }, 300)
  }

  return (
    <div className='flex justify-center'>
      <Button type='primary' onClick={handleClickButton} className='mb-4 rounded-md bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600'>
        {buttonText}
      </Button>
    </div>
  )
}
