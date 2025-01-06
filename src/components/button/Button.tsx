import LoadingIcon from '@/assets/svgs/loading.svg'
import clsx from 'clsx'
import { CSSProperties, FC, MouseEvent, PropsWithChildren, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

type ButtonType = 'primary' | 'default' | 'text' | 'link'
type ButtonSize = 'small' | 'default' | 'large'
type ButtonIconPosition = 'start' | 'end' | 'top'
type ButtonShape = 'default' | 'circle' | 'round'

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
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

export const Button: FC<Props> = (props) => {
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
    onClick,
  }

  if (href && /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(href)) {
    return (
      <a {...commonProps} href={href}>
        {loading && <LoadingIcon className={styles[`svg-${type}`]} />}
        {icon && icon}
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link to={href} {...commonProps}>
        {loading && <LoadingIcon className={styles[`svg-${type}`]} />}
        {icon && icon}
        {children}
      </Link>
    )
  }

  return (
    <button {...commonProps}>
      {loading && <LoadingIcon className={styles[`svg-${type}`]} />}
      {!!icon && !loading && icon}
      {children}
    </button>
  )
}
