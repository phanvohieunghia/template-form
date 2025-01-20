import { useEffect, useState } from 'react'

export type UseURLSearchParamsReturn = {
  getParam: (key: string) => string | null
  setParam: (key: string, value: string | null | undefined) => void
  deleteParam: (key: string) => void
  params: URLSearchParams
}

export const useURLSearchParams = (): UseURLSearchParamsReturn => {
  const [params, setParams] = useState<URLSearchParams>(() => new URLSearchParams(window.location.search))

  const getParam = (key: string): string | null => {
    return params.get(key)
  }

  const setParam = (key: string, value: string | null | undefined): void => {
    const updatedParams = new URLSearchParams(params)
    if (value === undefined || value === null) updatedParams.delete(key)
    else updatedParams.set(key, value)
    const newURL = `${window.location.pathname}?${updatedParams.toString()}`
    window.history.pushState({}, '', newURL)
    setParams(updatedParams)
  }

  const deleteParam = (key: string): void => {
    setParam(key, null)
  }

  useEffect(() => {
    const handlePopState = () => {
      setParams(new URLSearchParams(window.location.search))
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return { getParam, setParam, deleteParam, params }
}
