import GoogleIcon from '@/assets/svgs/google.svg'
import { Button, Input } from '@/components'
import { appConfig } from '@/configs'
import { AuthService } from '@/stores'
import { getOauthGoogleUrl, ROUTE_NAME } from '@/utils'
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
    <div className='mx-auto mt-40 w-full max-w-[400px] space-y-5'>
      <h1 className='mb-3 text-center text-2xl font-bold'>Đăng nhập</h1>
      <Input title='Email' {...register('email')} message={errorMessage.email} onFocus={() => setErrorMessage(defaultFrom)} />
      <Input
        title='Mật khẩu'
        {...register('password')}
        message={errorMessage.password}
        onFocus={() => setErrorMessage(defaultFrom)}
        type='password'
        titleExtra={
          <Link to={ROUTE_NAME.FORGOT_PASSWORD_} className='text-xs text-green-600'>
            Quên mật khẩu?
          </Link>
        }
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

      <div className='flex items-center py-5'>
        <span className='h-[1px] flex-1 bg-gray-300'></span>
        <span className='px-3 text-sm text-gray-400'>hoặc đăng nhập với</span>
        <span className='h-[1px] flex-1 bg-gray-300'></span>
      </div>

      <Button icon={<GoogleIcon fontSize={20} />} block className='button-default' href={getOauthGoogleUrl(appConfig.googleClientId)}>
        Google
      </Button>
    </div>
  )
}
