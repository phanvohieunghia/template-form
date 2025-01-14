import clsx from 'clsx'
import debounce from 'lodash/debounce'
import { memo, useEffect, useRef, useState } from 'react'
import { CurrentSelectState, CurrentSelectType, DefaultOptionType } from './interfaces'

const REST_COUNT_CURRENT_SELECT_STYLE = 'whitespace-nowrap rounded-md bg-gray-200 py-1 px-2'
const CURRENT_SELECT_GAP = 4

export const CurrentSelect = memo((props: CurrentSelectType) => {
  const { selected, defaultValue, placeholder, mode } = props

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
        currentLeftPosition += currentSelectedItemWidth + CURRENT_SELECT_GAP
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

  if (!defaultValue || !selected || (selected as DefaultOptionType[]).length === 0) {
    return <span className='text-gray-300'>{placeholder}</span>
  } else if (Array.isArray(selected)) {
    const restCount = state.selectedItems.reduce((a, v) => a + (v.isDisplay ? 0 : 1), 0)
    return (
      <div
        className='inline-flex flex-1 flex-nowrap'
        style={{ maxWidth: 'calc(100% - 24px)', gap: CURRENT_SELECT_GAP }}
        ref={selectedItemsWrapperRef}
      >
        {selected.map((item, index) => (
          <span
            className={clsx(REST_COUNT_CURRENT_SELECT_STYLE, !state.selectedItems[index]?.isDisplay && 'absolute opacity-0')}
            key={item.value}
            ref={(el) => (selectedItemsRefs.current[index] = el as HTMLSpanElement)}
          >
            {item.label}
          </span>
        ))}
        <span className={clsx(REST_COUNT_CURRENT_SELECT_STYLE, !restCount && 'absolute opacity-0')} ref={restItemRef}>
          + {restCount} ...
        </span>
      </div>
    )
  }
  return <span>{selected.label}</span>
})
