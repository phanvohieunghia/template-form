import LoadingIcon from '@/assets/svgs/loading.svg'
import clsx from 'clsx'
import { CSSProperties, FocusEvent, forwardRef, MouseEvent, PropsWithChildren, ReactNode, Ref } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

type ButtonType = 'primary' | 'default' | 'text' | 'link'
type ButtonSize = 'small' | 'default' | 'large'
type ButtonIconPosition = 'start' | 'end' | 'top'
type ButtonShape = 'default' | 'circle' | 'round'
type ButtonElement = HTMLButtonElement | HTMLAnchorElement

interface Props extends PropsWithChildren {
  type?: ButtonType
  size?: ButtonSize
  shape?: ButtonShape
  iconPosition?: ButtonIconPosition
  icon?: ReactNode
  href?: string
  disabled?: boolean
  loading?: boolean
  block?: boolean
  className?: string
  style?: CSSProperties
  ref: Ref<ButtonElement>
  onClick?: (event: MouseEvent<ButtonElement>) => void
  onMouseEnter?: (event: MouseEvent<ButtonElement>) => void
  onMouseLeave?: (event: MouseEvent<ButtonElement>) => void
  onFocus?: (event: FocusEvent<ButtonElement>) => void
  onBlur?: (event: FocusEvent<ButtonElement>) => void
}

export const Button = forwardRef<ButtonElement, Props>((props, ref) => {
  const {
    children,
    shape = 'default',
    type = 'default',
    size = 'default',
    iconPosition = 'start',
    icon,
    disabled,
    loading,
    href,
    block,
    className,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onBlur,
    onFocus,
    ...restProps
  } = props

  const commonProps = {
    className: clsx(
      styles['button'],
      styles[`type-${type}`],
      styles[`icon-position-${iconPosition}`],
      styles[`size-${size}`],
      styles[`shape-${shape}`],
      disabled && styles['disabled'],
      loading && styles['loading'],
      block && styles['block'],
      className,
    ),
    style,
    ref,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onBlur,
    onFocus,
    ...restProps,
  }

  if (href && /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(href)) {
    return (
      <a {...commonProps} href={href} ref={ref as Ref<HTMLAnchorElement>}>
        {loading && <LoadingIcon className={styles[`svg-${type}`]} />}
        {icon && icon}
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link to={href} {...commonProps} ref={ref as Ref<HTMLAnchorElement>}>
        {loading && <LoadingIcon className={styles[`svg-${type}`]} />}
        {icon && icon}
        {children}
      </Link>
    )
  }

  return (
    <button {...commonProps} ref={ref as Ref<HTMLButtonElement>}>
      {loading && <LoadingIcon className={styles[`svg-${type}`]} />}
      {!!icon && !loading && icon}
      {children}
    </button>
  )
})
// TODO: don't perform event when this button disabled
