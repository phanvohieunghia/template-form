import { AlertSuccessfulModalPayload, Button, Input } from '@/components'
import { AuthService } from '@/stores'
import { EVENT_NAME, EventManager, ROUTE_NAME } from '@/utils'
import { ResetPasswordVariables, validateResetPassword } from '@/validations/resetPasswordSchema'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const defaultFrom = { password: '', confirmPassword: '' }

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<ResetPasswordVariables>()

  const [errorMessage, setErrorMessage] = useState<ResetPasswordVariables>(defaultFrom)

  const onSubmit: SubmitHandler<ResetPasswordVariables> = async (data) => {
    const errors = validateResetPassword(data)
    if (errors) {
      setErrorMessage(errors)
    } else {
      const result = await AuthService.instance.resetPassword({ ...data, forgotPasswordToken: '' })
      if (result.success) {
        EventManager.emit<AlertSuccessfulModalPayload>(EVENT_NAME.ALERT_SUCCESSFUL.OPEN, {
          buttonText: 'Trở về đăng nhập',
          content: 'Bạn đã thay đổi mật khẩu.',
          onSubmit: () => {
            navigate(ROUTE_NAME.LOGIN_)
          },
        })
      }
    }
  }

  return (
    <div className='mx-auto mt-40 w-full max-w-[400px] space-y-5'>
      <h1 className='mb-3 text-center text-2xl font-bold'>Đặt Lại Mật Khẩu</h1>
      <Input
        title='Mật khẩu'
        {...register('password')}
        message={errorMessage.password}
        onFocus={() => setErrorMessage(defaultFrom)}
        type='password'
      />

      <Input
        title='Xác nhận Mật khẩu'
        {...register('confirmPassword')}
        message={errorMessage.password}
        onFocus={() => setErrorMessage(defaultFrom)}
        type='password'
      />

      <Button block type='primary' onClick={handleSubmit(onSubmit)} className='button-primary'>
        Đặt lại mật khẩu
      </Button>
    </div>
  )
}

export default ResetPasswordPage
