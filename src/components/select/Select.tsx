import CheckIcon from '@/assets/svgs/check.svg'
import ChevronDownIcon from '@/assets/svgs/chevron_down.svg'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getNewPosition } from '../utils'
import { DefaultOptionType, ModeType, Props, State } from './interfaces'
import { CurrentSelect } from './Select.Current'

const getSelectedItem = (options: DefaultOptionType[] | undefined, mode?: ModeType, defaultValue?: string) => {
  const selectedItem = options?.find((options) => options.value === defaultValue)
  if (!selectedItem) return selectedItem
  if (mode === 'multiple') return [selectedItem]
  return selectedItem
}

export const Select = (props: Props) => {
  const { mode, options, defaultValue, onChange, style, placeholder = '' } = props

  const childRef = useRef<HTMLButtonElement | HTMLInputElement | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const [selectState, setSelectState] = useState<State>({
    selected: getSelectedItem(options, mode, defaultValue),
    isActive: false,
    isOpen: false,
    isDisplay: false,
    position: { top: 0, left: 0 },
  })

  const handleClick = () => {
    setSelectState((prev) => ({ ...prev, isOpen: true }))
    if (selectState.isActive) {
      setSelectState((prev) => ({ ...prev, isActive: !prev.isActive }))
    } else {
      handleActiveSelect()
    }
  }

  const handleActiveSelect = useCallback(() => {
    const timeout = setTimeout(() => {
      const newPosition = getNewPosition(childRef, popupRef, 6)
      if (newPosition) setSelectState((prev) => ({ ...prev, position: newPosition }))
      setSelectState((prev) => ({ ...prev, isActive: !prev.isActive }))
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
        setSelectState((prev) => ({ ...prev, isActive: false }))
        clearTimeout(timeout)
      }, 100)
    }
  }

  const handleChoose = (data: DefaultOptionType) => {
    if (mode === 'multiple')
      setSelectState((prev) => {
        const duplicatedIndex = (prev.selected as DefaultOptionType[]).findIndex((item) => item.value === data.value)
        if (duplicatedIndex !== -1) {
          const clonedSelected = [...(prev.selected as DefaultOptionType[])]
          clonedSelected.splice(duplicatedIndex, 1)
          return { ...prev, selected: [...clonedSelected] }
        } else return { ...prev, selected: [...(prev.selected as DefaultOptionType[]), data] }
      })
    else setSelectState((prev) => ({ ...prev, isActive: false, selected: data }))
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    if (selectState.isActive) setSelectState((prev) => ({ ...prev, isDisplay: true }))
    else
      timeout = setTimeout(() => {
        setSelectState((prev) => ({ ...prev, isDisplay: false }))
      }, 300)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [selectState.isActive])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (onChange) onChange(selectState.selected)
  }, [selectState.selected])

  return (
    <div>
      <span
        className='inline-flex items-center justify-between rounded-md border-[1px] border-gray-300 px-2 py-1 hover:cursor-pointer'
        ref={childRef}
        onClick={handleClick}
        style={style}
      >
        <CurrentSelect selected={selectState.selected} defaultValue={defaultValue} placeholder={placeholder} mode={mode} />
        <ChevronDownIcon fontSize={20} stroke={'grey'} className='ml-1' />
      </span>
      {selectState.isOpen &&
        createPortal(
          <div>
            <div
              ref={popupRef}
              className={clsx(
                'absolute z-10 flex flex-col gap-[2px] overflow-hidden rounded-md bg-white p-1',
                selectState.isActive ? 'animate-fade-in' : 'animate-fade-out',
              )}
              style={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                visibility: selectState.isDisplay ? 'visible' : 'hidden',
                top: selectState.position.top,
                left: selectState.position.left,
                width: style?.width,
              }}
            >
              {options &&
                options.map((item) => {
                  const isSelectedItem = () => {
                    if (Array.isArray(selectState.selected)) {
                      return selectState.selected.some((selectedItem) => selectedItem.value === item.value)
                    }
                    return item.value === selectState.selected?.value
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
    </div>
  )
}
