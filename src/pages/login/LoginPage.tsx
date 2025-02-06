import { Button, Input } from '@/components'
import { AuthService } from '@/stores'
import { ROUTE_NAME } from '@/utils'
import { LoginVariables, validateLogin } from '@/validations'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const defaultFrom = { password: '', email: '' }

export const LoginPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<LoginVariables>()

  const [errorMessage, setErrorMessage] = useState<LoginVariables>(defaultFrom)

  const onSubmit: SubmitHandler<LoginVariables> = async (data) => {
    const errors = validateLogin(data)
    if (errors) {
      setErrorMessage(errors)
    } else {
      const result = await AuthService.instance.login(data)
      if (result.success && result.redirectTo) {
        navigate(result.redirectTo)
      }
    }
  }

  return (
    <div className='mx-auto mt-40 w-full max-w-[500px] space-y-5'>
      <Input title='Email' {...register('email')} message={errorMessage.email} onFocus={() => setErrorMessage(defaultFrom)} />
      <Input
        title='Mật khẩu'
        {...register('password')}
        message={errorMessage.password}
        onFocus={() => setErrorMessage(defaultFrom)}
        type='password'
      />
      <Button block type='primary' onClick={handleSubmit(onSubmit)} className='button-primary'>
        Đăng nhập
      </Button>

      <div className='text-center text-sm'>
        Bạn chưa có tài khoản?{' '}
        <Link to={ROUTE_NAME.REGISTER_} className='text-green-600'>
          Đăng ký
        </Link>
      </div>
    </div>
  )
}
