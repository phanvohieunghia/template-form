import { AlertSuccessfulModal, AlertSuccessfulModalPayload, Button, Input } from '@/components'
import { AuthService } from '@/stores'
import { EVENT_NAME, EventManager } from '@/utils'
import { RegisterForm, validateRegister } from '@/validations'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const defaultFrom = { password: '', email: '', name: '', phone: '', confirmPassword: '' }

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<RegisterForm>()
  const [errorMessage, setErrorMessage] = useState<RegisterForm>(defaultFrom)

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    const errors = validateRegister(data)
    if (errors) {
      setErrorMessage(errors)
    } else {
      const result = await AuthService.instance.register(data)
      if (result.success && result.redirectTo) {
        EventManager.emit<AlertSuccessfulModalPayload>(EVENT_NAME.ALERT_SUCCESSFUL.OPEN, {
          content: (
            <div className='text-center'>
              <div>Chúc mừng bạn đã đăng ký tài khoản thành công!</div>
              <div>Đăng nhập ngay để sử dụng</div>
            </div>
          ),
          onSubmit: () => {
            navigate(result.redirectTo as string)
          },
        })
      }
    }
  }

  return (
    <>
      <div className='mx-auto mt-40 w-full max-w-[500px] space-y-5'>
        <Input title='Email' {...register('email')} message={errorMessage.email} onFocus={() => setErrorMessage(defaultFrom)} />
        <Input title='Tên' {...register('name')} message={errorMessage.name} onFocus={() => setErrorMessage(defaultFrom)} />
        <Input title='Số điện thoại' {...register('phone')} message={errorMessage.phone} onFocus={() => setErrorMessage(defaultFrom)} />
        <Input
          title='Mật khẩu'
          {...register('password')}
          message={errorMessage.password}
          onFocus={() => setErrorMessage(defaultFrom)}
          type='password'
        />
        <Input
          title='Xác nhận mật khẩu'
          {...register('confirmPassword')}
          message={errorMessage.confirmPassword}
          onFocus={() => setErrorMessage(defaultFrom)}
          type='password'
        />

        <Button block type='primary' onClick={handleSubmit(onSubmit)}>
          Đăng ký
        </Button>
      </div>
      <AlertSuccessfulModal />
    </>
  )
}
