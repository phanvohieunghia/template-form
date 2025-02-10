import EyeIcon from '@/assets/svgs/eye.svg'
import EyeOffIcon from '@/assets/svgs/eye_off.svg'
import clsx from 'clsx'
import { ChangeEvent, CSSProperties, forwardRef, KeyboardEvent, useState } from 'react'
import styles from './Input.module.css'

type InputType = 'text' | 'number' | 'email' | 'password'
export type StatusInput = 'info' | 'error' | 'warning' | 'success' | 'default'
type SizeInput = 'default' | 'large' | 'small'
type TitlePosition = 'top' | 'left'

interface Props {
  type?: InputType
  placeholder?: string
  message?: string
  status?: StatusInput
  value?: string
  size?: SizeInput
  style?: CSSProperties
  icon?: JSX.Element
  disabled?: boolean
  titlePosition?: TitlePosition
  title?: string
  titleStyle?: CSSProperties
  readonly?: boolean
  label?: boolean
  onFocus?: (event: ChangeEvent<HTMLInputElement>) => void
  onEnter?: () => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  extra?: JSX.Element
  titleExtra?: JSX.Element
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    disabled = false,
    icon,
    message,
    placeholder = '',
    size = 'default',
    status,
    style,
    title,
    type = 'text',
    titlePosition = 'top',
    titleStyle,
    readonly = false,
    onFocus,
    onEnter = () => {},
    onChange = () => {},
    extra,
    titleExtra,
    ...restProps
  } = props
  const [inputType, setInputType] = useState<InputType>(type)

  const commonProps = {
    type: inputType,
    placeholder,
    disabled,
    readOnly: readonly,
    onFocus,
    onChange,
    ...restProps,
  }

  const showHidePassword = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onEnter()
    }
  }

  return (
    <div
      style={{ width: '100%', ...style }}
      className={clsx(
        styles['input'],
        status && styles[`status-${status}`],
        title && styles[`position-${titlePosition}`],
        styles[`size-${size}`],
        disabled && styles['disabled'],
        readonly && styles['readonly'],
      )}
    >
      <div className='flex items-end justify-between'>
        {title && (
          <div style={titleStyle} className={clsx(styles['title'])}>
            {title}
          </div>
        )}
        {titleExtra && titleExtra}
      </div>
      <div className={clsx(styles['wrapper'])}>
        {icon && icon}
        <input {...commonProps} onKeyDown={handleKeyDown} ref={ref} />
        {type === 'password' && (
          <div onClick={showHidePassword}>{inputType === 'password' ? <EyeOffIcon fontSize='20' /> : <EyeIcon fontSize='20' />}</div>
        )}
        {extra && extra}
      </div>
      {message && <p className={clsx(styles['msg'])}>{message}</p>}
    </div>
  )
})
