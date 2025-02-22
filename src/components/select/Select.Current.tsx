import clsx from 'clsx'
import debounce from 'lodash/debounce'
import { memo, useEffect, useRef, useState } from 'react'
import { SELECT } from '../utils'
import { CurrentSelectState, CurrentSelectType, DefaultOptionType } from './interfaces'
import styles from './style.module.css'

export const CurrentSelect = memo((props: CurrentSelectType) => {
  const { selected, placeholder, mode } = props

  const selectedItemsWrapperRef = useRef<HTMLDivElement>(null)
  const selectedItemsRefs = useRef<HTMLSpanElement[]>([])
  const restItemRef = useRef<HTMLSpanElement>(null)

  const [state, setState] = useState<CurrentSelectState>({ selectedItems: [], isDisplay: false, wrapperWidth: 0, resize: window.innerWidth })

  useEffect(() => {
    if (!Array.isArray(selected)) return
    let currentLeftPosition = 0
    const newSelectedItems = selectedItemsRefs.current
      .filter((item) => item !== null)
      .map((item, index, items) => {
        const restItemWidth = restItemRef.current?.offsetWidth ?? 0
        const currentSelectedItemWidth = item.offsetWidth
        const getIsDisplay = () => {
          const wrapperWidth = state.wrapperWidth === 0 ? (selectedItemsWrapperRef.current?.offsetWidth as number) : state.wrapperWidth
          if (index !== items.length - 1) {
            if (currentLeftPosition + currentSelectedItemWidth > wrapperWidth) return false
            else {
              if (currentLeftPosition + currentSelectedItemWidth + restItemWidth > wrapperWidth) return false
              else return true
            }
          } else {
            if (currentLeftPosition + currentSelectedItemWidth > wrapperWidth) return false
            else return true
          }
        }
        const mappedSelectedItems = {
          element: item,
          isDisplay: getIsDisplay(),
        }
        currentLeftPosition += currentSelectedItemWidth + SELECT.GAP
        return mappedSelectedItems
      })
    const newState: Partial<CurrentSelectState> = { selectedItems: newSelectedItems }
    const selectedItemsWrapperWidth = selectedItemsWrapperRef.current?.offsetWidth ?? 0
    if (selectedItemsWrapperWidth > 0) newState.wrapperWidth = selectedItemsWrapperWidth
    setState((prev) => ({ ...prev, ...newState }))
  }, [selected, state.resize])

  useEffect(() => {
    const handleResize = () => {
      const newState: Partial<CurrentSelectState> = { resize: window.innerWidth, wrapperWidth: selectedItemsWrapperRef.current?.offsetWidth }
      if (mode) setState((prev) => ({ ...prev, ...newState }))
    }

    if (mode === 'multiple') window.addEventListener('resize', debounce(handleResize, 100))
    return () => {
      if (mode === 'multiple') window.removeEventListener('resize', debounce(handleResize, 100))
    }
  }, [])

  if (!selected || (selected as DefaultOptionType[]).length === 0) {
    return <span className='text-gray-300'>{placeholder}</span>
  } else if (Array.isArray(selected)) {
    const restCount = state.selectedItems.reduce((a, v) => a + (v.isDisplay ? 0 : 1), 0)
    return (
      <div className='inline-flex flex-1 flex-nowrap' style={{ maxWidth: 'calc(100% - 24px)', gap: SELECT.GAP }} ref={selectedItemsWrapperRef}>
        {selected.map((item, index) => (
          <span
            className={clsx(styles['rest-count'], !state.selectedItems[index]?.isDisplay && 'absolute opacity-0')}
            key={item.value}
            ref={(el) => (selectedItemsRefs.current[index] = el as HTMLSpanElement)}
          >
            {item.label}
          </span>
        ))}
        <span className={clsx(styles['rest-count'], !restCount && 'absolute opacity-0')} ref={restItemRef}>
          + {restCount} ...
        </span>
      </div>
    )
  }
  return <span>{selected.label}</span>
})
