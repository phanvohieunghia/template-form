import CheckIcon from '@/assets/svgs/check.svg'
import ChevronDownIcon from '@/assets/svgs/chevron_down.svg'
import clsx from 'clsx'
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getNewPopupPosition } from '../utils'
import { DefaultOptionType, ModeType, Props, State } from './interfaces'
import { CurrentSelect } from './Select.Current'

const getSelectedItem = (options: DefaultOptionType[] | undefined, mode?: ModeType, defaultValue?: string) => {
  const selectedItem = options?.find((options) => options.value === defaultValue)
  if (!selectedItem) return selectedItem
  if (mode === 'multiple') return [selectedItem]
  return selectedItem
}

export const Select = (props: Props) => {
  const { mode, options, defaultValue, onChange, placeholder = '', ...restProps } = props

  const childRef = useRef<HTMLButtonElement | HTMLInputElement | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const [state, setState] = useState<State>({
    selected: getSelectedItem(options, mode, defaultValue),
    isActive: false,
    isOpen: false,
    isDisplay: false,
    position: { top: 0, left: 0 },
  })

  const handleClick = () => {
    setState((prev) => ({ ...prev, isOpen: true }))
    if (state.isActive) {
      setState((prev) => ({ ...prev, isActive: !prev.isActive }))
    } else {
      handleActiveSelect()
    }
  }

  const handleActiveSelect = useCallback(() => {
    const timeout = setTimeout(() => {
      const newPosition = getNewPopupPosition(childRef, popupRef, 6)
      if (newPosition) setState((prev) => ({ ...prev, position: newPosition }))
      setState((prev) => ({ ...prev, isActive: !prev.isActive }))
      clearTimeout(timeout)
    }, 0)
  }, [])

  const handleClickOutside = (event: Event) => {
    if (
      childRef.current &&
      !childRef.current.contains(event.target as Node) &&
      popupRef.current &&
      !popupRef.current.contains(event.target as Node)
    ) {
      const timeout = setTimeout(() => {
        setState((prev) => ({ ...prev, isActive: false }))
        clearTimeout(timeout)
      }, 100)
    }
  }

  const handleChoose = (data: DefaultOptionType) => {
    if (mode === 'multiple')
      setState((prev) => {
        const duplicatedIndex = ((prev.selected as DefaultOptionType[] | undefined) ?? []).findIndex((item) => item.value === data.value)
        if (duplicatedIndex !== -1) {
          const clonedSelected = [...((prev.selected as DefaultOptionType[] | undefined) ?? [])]
          clonedSelected.splice(duplicatedIndex, 1)
          return { ...prev, selected: [...clonedSelected] }
        } else return { ...prev, selected: [...((prev.selected as DefaultOptionType[] | undefined) ?? []), data] }
      })
    else setState((prev) => ({ ...prev, isActive: false, selected: data }))
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    if (state.isActive) setState((prev) => ({ ...prev, isDisplay: true }))
    else
      timeout = setTimeout(() => {
        setState((prev) => ({ ...prev, isDisplay: false }))
      }, 300)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [state.isActive])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (onChange) onChange(state.selected)
  }, [state.selected])

  return (
    <>
      <span
        ref={childRef}
        onClick={handleClick}
        {...restProps}
        className={clsx(
          'inline-flex items-center justify-between rounded-md border-[1px] border-gray-300 px-2 py-1 hover:cursor-pointer',
          restProps.className,
        )}
      >
        <CurrentSelect selected={state.selected} placeholder={placeholder} mode={mode} />
        <ChevronDownIcon fontSize={20} stroke={'grey'} className='ml-1' />
      </span>
      {state.isOpen &&
        createPortal(
          <div>
            <div
              ref={popupRef}
              className={clsx(
                'absolute z-10 flex flex-col gap-[2px] overflow-hidden rounded-md bg-white p-1',
                state.isActive ? 'animate-fade-in' : 'animate-fade-out',
              )}
              style={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                visibility: state.isDisplay ? ('visible' as CSSProperties['visibility']) : ('hidden' as CSSProperties['visibility']),
                top: state.position.top,
                left: state.position.left,
                width: restProps.style?.width ?? childRef.current?.offsetWidth,
              }}
            >
              {options &&
                options.map((item) => {
                  const isSelectedItem = () => {
                    if (Array.isArray(state.selected)) {
                      return state.selected.some((selectedItem) => selectedItem.value === item.value)
                    }
                    return item.value === state.selected?.value
                  }
                  return (
                    <div
                      key={item.value}
                      onClick={() => handleChoose(item)}
                      className={clsx(
                        'flex items-center justify-between rounded-md px-3 py-1 hover:cursor-pointer hover:bg-gray-200',
                        isSelectedItem() && '!bg-blue-200',
                      )}
                    >
                      <span>{item.label}</span>
                      {mode === 'multiple' && isSelectedItem() && <CheckIcon />}
                    </div>
                  )
                })}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
