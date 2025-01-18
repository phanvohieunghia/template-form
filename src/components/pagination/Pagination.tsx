import ChevronLeftIcon from '@/assets/svgs/chevron_left.svg'
import ChevronRightIcon from '@/assets/svgs/chevron_right.svg'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { Button } from '../button'
import styles from './style.module.css'

type Props = {
  total: number
  defaultCurrent?: number
  defaultPageSize?: number
  onChange?: (data: Record<string, unknown>) => void
}

type State = {
  currentPage: number
  disabledLeft: boolean
  disabledRight: boolean
}

const PRESENTED_NUMBERS = 5

export const Pagination = (props: Props) => {
  const { total, defaultPageSize = 10, defaultCurrent = 1, onChange } = props

  const totalPage = useMemo(() => {
    return Math.ceil(total / defaultPageSize)
  }, [total, defaultPageSize])

  const [state, setState] = useState<State>({
    currentPage: defaultCurrent,
    disabledLeft: defaultCurrent === 1,
    disabledRight: defaultCurrent === totalPage,
  })

  const PresentedPageNumbers = useMemo(() => {
    const init = Array(PRESENTED_NUMBERS).fill(null)
    if (totalPage > PRESENTED_NUMBERS) {
      if (3 <= state.currentPage && state.currentPage <= totalPage - 2) return init.map((_, i) => state.currentPage - 2 + i)
      else if (state.currentPage < 3) return init.map((_, i) => i + 1)
      else return init.map((_, i) => totalPage - i).reverse()
    } else return init.map((_, i) => i + 1)
  }, [state, totalPage])

  const changePreviousPage = () => {
    if (state.currentPage <= 1) return
    setState((prev) => {
      if (onChange) onChange()
      return {
        ...prev,
        currentPage: prev.currentPage - 1,
        disabledLeft: prev.currentPage - 1 === 1,
        disabledRight: false,
      }
    })
  }

  const changeNextPage = () => {
    if (state.currentPage >= totalPage) return
    setState((prev) => ({
      ...prev,
      currentPage: prev.currentPage + 1,
      disabledLeft: false,
      disabledRight: state.currentPage + 1 === totalPage,
    }))
    if (onChange) onChange()
  }

  const changeCurrentPage = (currentPage: number) => {
    setState((prev) => ({
      ...prev,
      currentPage,
      disabledLeft: currentPage === 1,
      disabledRight: currentPage === totalPage,
    }))
    if (onChange) onChange()
  }
  if (total === 0) return null

  return (
    <div className='inline-flex items-center gap-3'>
      {totalPage > PRESENTED_NUMBERS && (
        <Button
          className={styles['button']}
          shape='circle'
          type='text'
          icon={<ChevronLeftIcon fontSize={22} />}
          onClick={changePreviousPage}
          disabled={state.disabledLeft}
        />
      )}
      {PresentedPageNumbers.map((number, index) => (
        <Button
          className={clsx(styles['button'], styles[state.currentPage === number ? 'primary' : 'default'])}
          key={index}
          shape='circle'
          type={state.currentPage === number ? 'primary' : 'default'}
          onClick={() => changeCurrentPage(number)}
        >
          {number}
        </Button>
      ))}
      {totalPage > PRESENTED_NUMBERS && (
        <Button
          className={styles['button']}
          shape='circle'
          type='text'
          icon={<ChevronRightIcon fontSize={22} />}
          onClick={changeNextPage}
          disabled={state.disabledRight}
        />
      )}
    </div>
  )
}
