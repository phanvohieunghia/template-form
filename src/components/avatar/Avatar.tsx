import clsx from 'clsx'
import { CSSProperties, forwardRef, HTMLAttributes, PropsWithChildren, ReactNode, Ref, useEffect, useRef } from 'react'
import styles from './styles.module.css'
interface Props extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  size?: number
  src?: string | ReactNode
  shape?: 'circle' | 'square'
  style?: CSSProperties
  ref: Ref<HTMLDivElement>
}

export const Avatar = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, icon, size = 16, src, shape = 'circle', style, className, ...restProps } = props
  const textRef = useRef<HTMLSpanElement>(null)

  const defaultIconSize = src === undefined ? size / 2 : size
  useEffect(() => {
    if (textRef.current) {
      const scale = size / (textRef.current.offsetWidth || size) - 0.05
      if (scale >= 1) return
      textRef.current.style.transform = `scale(${Math.min(scale, 1)})`
    }
  }, [children, size])

  return (
    <div
      style={{ width: size, height: size, fontSize: defaultIconSize, ...style }}
      className={clsx(styles['avatar'], styles[`shape-${shape}`], className)}
      {...restProps}
      ref={ref}
    >
      {icon && icon}
      <span className='whitespace-nowrap' ref={textRef}>
        {children}
      </span>
      {src && (typeof src === 'string' ? <img src={src} /> : src)}
    </div>
  )
})
