import SearchIcon from '@/assets/svgs/search.svg'
import { Input } from '@/components'
import { validatePhoneNumber } from '@/utils'
import { ChangeEvent, useState } from 'react'
import styles from './input.module.css'

type Status = 'info' | 'error' | 'warning' | 'success' | 'default'

type TextInput = {
  value: string
  status: Status
  message: string
  validate: boolean
}

export const InputTestPage = () => {
  const [text, setText] = useState<TextInput>({
    value: '',
    status: 'default',
    message: '',
    validate: true,
  })
  const [email, setEmail] = useState<TextInput>({
    value: '',
    status: 'default',
    message: '',
    validate: true,
  })
  const [phoneNumber, setPhoneNumber] = useState<TextInput>({
    value: '',
    status: 'default',
    message: '',
    validate: true,
  })
  const [password, setPassword] = useState<TextInput>({
    value: '',
    status: 'default',
    message: '',
    validate: true,
  })

  const handleOnChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace('  ', ' ')
    if (value.startsWith(' ')) value.trim()
    if (value.length >= 8 || value.length === 0) {
      setPassword({
        ...password,
        status: 'default',
        message: '',
        value: value,
      })
    } else {
      setPassword({
        ...password,
        status: 'warning',
        message: '* Weak',
        value: value,
      })
    }
  }

  const handleOnChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    let status: Status = 'default'
    let message: string = ''

    const value = event.target.value.replace('  ', ' ')
    if (value.startsWith(' ')) value.trim()
    if (value.length === 0) {
      status = 'info'
      message = ''
      setPhoneNumber({
        ...phoneNumber,
        status: status,
        message: message,
        value: value,
      })
    }
    const isValidatePhoneNumber = validatePhoneNumber(value)
    if (isValidatePhoneNumber) {
      status = 'info'
      message = ''
    } else {
      status = 'error'
      message = '* Phone number not validate'
    }
    setPhoneNumber({
      ...phoneNumber,
      status: status,
      message: message,
      value: value,
    })
  }

  return (
    <>
      <div className={`${styles['wrapper']}`}>
        <h4>Default</h4>
        <div>
          <Input placeholder='Text' />
        </div>
      </div>
      <div className={`${styles['wrapper']}`}>
        <h4>Disabled</h4>
        <div>
          <Input style={{ width: 200 }} disabled={true} placeholder={'Disabled'} />
        </div>
      </div>
      <div className={`${styles['wrapper']}`}>
        <h4>Icon</h4>
        <div>
          <Input icon={<SearchIcon fontSize={'unset'} />} style={{ width: 200 }} placeholder={'Text'} />
        </div>
      </div>
      <div className={`${styles['wrapper']}`}>
        <h4>Size</h4>
        <div>
          <Input style={{ width: 200 }} placeholder={'Large Size'} size='large' />
          <Input style={{ width: 200 }} placeholder={'Default Size'} size='default' />
          <Input style={{ width: 200 }} placeholder={'Small Size'} size='small' />
        </div>
      </div>
      <div className={`${styles['wrapper']}`}>
        <h4>Status</h4>
        <div>
          <Input style={{ width: 200 }} status='info' placeholder={'Info'} />
          <Input style={{ width: 200 }} status='warning' placeholder={'Warning'} />
          <Input style={{ width: 200 }} status='error' placeholder={'Error'} />
          <Input style={{ width: 200 }} status='success' placeholder={'Success'} />
        </div>
      </div>
      <div className={`${styles['wrapper']}`}>
        <h4>Width 100%</h4>
        <div>
          <Input style={{ width: '100%' }} placeholder={'Width 100%'} />
        </div>
      </div>
      <div className={`${styles['wrapper']}`}>
        <h4>Title Position</h4>
        <div>
          <Input style={{ width: 200 }} title='Title top' placeholder={'Title top'} />
          <Input style={{}} title='Title left' titlePosition='left' placeholder={'Title top'} titleStyle={{ width: 'unset' }} />
        </div>
      </div>
      <div className={`${styles['wrapper']}`}>
        <h4>Type</h4>
        <div>
          <Input style={{ width: 200 }} title='Text' type='text' />
          <Input style={{ width: 200 }} title='Email' type='email' value='abc@gmail.com' />
          <Input style={{ width: 200 }} title='Number' type='number' value='0988486443' />
          <Input style={{ width: 200 }} title='Password' type='password' value='12345678' />
        </div>
      </div>
      <div className={`${styles['wrapper']}`}>
        <h4>Simulate</h4>
        <div>
          <Input
            style={{ width: 200 }}
            title='Text'
            type='text'
            placeholder='Text'
            value={text.value}
            onChange={(e) => {
              setText({ ...text, value: e.target.value })
            }}
          />
          <Input
            style={{ width: 200 }}
            title='Email'
            type='email'
            placeholder='Email'
            value={email.value}
            onChange={(e) => {
              setEmail({ ...email, value: e.target.value })
            }}
          />
          <Input
            style={{ width: 200 }}
            title='Phone Number'
            type='number'
            placeholder='Phone Number'
            status={phoneNumber.status}
            message={phoneNumber.message}
            value={phoneNumber.value}
            onChange={handleOnChangePhoneNumber}
          />
          <Input
            style={{ width: 200 }}
            title='Password'
            placeholder='Password'
            type='password'
            status={password.status}
            value={password.value}
            message={password.message}
            onChange={handleOnChangePassword}
          />
        </div>
      </div>
    </>
  )
}
