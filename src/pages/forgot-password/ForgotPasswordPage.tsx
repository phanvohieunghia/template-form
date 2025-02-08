import { AlertSuccessfulModal, AlertSuccessfulModalPayload, Button, Input } from '@/components'
import { AuthService } from '@/stores'
import { EVENT_NAME, EventManager, ROUTE_NAME } from '@/utils'
import { ForgotPasswordVariables, validateForgotPassword } from '@/validations'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const defaultFrom = { email: '' }

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<ForgotPasswordVariables>()
  const [errorMessage, setErrorMessage] = useState<ForgotPasswordVariables>(defaultFrom)

  const onSubmit: SubmitHandler<ForgotPasswordVariables> = async (data) => {
    const errors = validateForgotPassword(data)
    if (errors) {
      setErrorMessage(errors)
    } else {
      const result = await AuthService.instance.forgotPassword(data)
      if (result.success) {
        EventManager.emit<AlertSuccessfulModalPayload>(EVENT_NAME.ALERT_SUCCESSFUL.OPEN, {
          content: (
            <div className='text-center'>
              Vui lòng kiểm tra email của bạn. Chúng tôi đã gửi cho bạn một email có chứa liên kết để đặt lại mật khẩu.
            </div>
          ),
          onSubmit: () => {
            navigate(ROUTE_NAME.LOGIN_)
          },
          buttonText: 'Quay về đăng nhập',
        })
      }
    }
  }

  return (
    <div className='mx-auto mt-40 w-full max-w-[400px] space-y-5'>
      <h1 className='mb-3 text-center text-2xl font-bold'>Lấy mật khẩu</h1>
      <h3 className='mb-4 text-center text-sm text-gray-500'>Nhập email liên kết với tài khoản của bạn để nhận email hướng dẫn đặt lại mật khẩu</h3>
      <Input title='Email' {...register('email')} message={errorMessage.email} onFocus={() => setErrorMessage(defaultFrom)} />
      <Button block type='primary' onClick={handleSubmit(onSubmit)} className='button-primary'>
        Gửi email
      </Button>
      <AlertSuccessfulModal />
    </div>
  )
}
