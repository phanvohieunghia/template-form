import ExampleTemplatePaperImage from '@/assets/images/example-template-paper.png'
import FileIcon from '@/assets/svgs/file.svg'
import LoadingIcon from '@/assets/svgs/loading.svg'
import { Pagination, PaginationProps } from '@/components'
import { useAppSelector, useURLSearchParams, UseURLSearchParamsReturn } from '@/hooks'
import { ProcedureService } from '@/stores'
import { ProcedureList, ThuTucUI } from '@/stores/procedure/interfaces'
import { getSearchParams, getUrlDecoding, ROUTE_NAME } from '@/utils'
import { HTMLAttributes, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'

export const Result = () => {
  const { setParam } = useURLSearchParams()
  const procedureData = useAppSelector((state) => state.procedure)
  const [loading, setLoading] = useState<boolean>(false)
  const urlQuery = getSearchParams()

  const fetchData = async () => {
    try {
      setLoading(true)
      await ProcedureService.instance.getAll({
        search: getUrlDecoding(getSearchParams().search ?? ''),
        page: Number(urlQuery.page ?? 1),
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [urlQuery.page, procedureData.search])

  return (
    <div>
      <div className='flex items-end justify-between'>
        <div className={styles['title-1']}>
          <FileIcon fontSize={28} stroke={'gray'} />
          <span>Kết quả tìm kiếm</span>
        </div>
        {!loading && procedureData.procedureList.rows && procedureData.procedureList.rows.length !== 0 && (
          <span className='text-sm text-gray-400'>{procedureData.procedureList.total} kết quả</span>
        )}
      </div>
      <div className='mt-6'>
        <ConditionalResult loading={loading} data={procedureData.procedureList} onSetParam={setParam} />
      </div>
    </div>
  )
}

type ConditionalResultType = {
  loading: boolean
  data: ProcedureList
  onSetParam: UseURLSearchParamsReturn['setParam']
}

const ConditionalResult = (props: ConditionalResultType) => {
  const { loading, data, onSetParam } = props
  const navigate = useNavigate()

  const handleClick = (data: ThuTucUI) => {
    const convertedProcedureName = data.tenThuTuc.replace(/( |\/|\\)/g, '-').replace(/%/g, '-phần-trăm')
    navigate(`${ROUTE_NAME.RESEARCH_}/${convertedProcedureName}-i.${data.thuTucId}`)
  }

  const handleChange: PaginationProps['onChange'] = useCallback((page: number) => {
    window.scrollTo({ top: 0 })
    onSetParam('page', page.toString())
  }, [])

  if (loading)
    return (
      <div className='flex justify-center'>
        <LoadingIcon fontSize={80} fill='green' />
      </div>
    )

  if (!data.rows) return

  if (data.rows.length === 0) return <div className='text-center text-2xl text-gray-500'>No data</div>

  if (data.rows.length > 0)
    return (
      <>
        <div className='flex flex-col gap-4'>
          {data.rows.map((item, index) => {
            return <Item data={item} key={index} onClick={() => handleClick(item)} />
          })}
        </div>
        <div className='mt-4 flex justify-center'>
          <Pagination defaultCurrent={Number(getSearchParams().page ?? 1)} total={data.total} onChange={handleChange} />
        </div>
      </>
    )
}

type ItemProps = {
  data: ThuTucUI
} & HTMLAttributes<HTMLDivElement>

const Item = (props: ItemProps) => {
  const { data, ...restProps } = props
  const { maThuTuc, tenThuTuc, loaiThuTuc, linhVuc } = data
  return (
    <div
      className='ease rounded-lg border-[1px] border-transparent bg-transparent transition-[border-color,background-color] duration-300 hover:cursor-pointer hover:border-green-600 hover:bg-green-600'
      {...restProps}
    >
      <div className='flex gap-3 rounded-lg border-[1px] border-green-600 bg-white p-4'>
        <div className='h-[150px] w-[200px] overflow-hidden rounded-lg border-[1px] border-green-300'>
          <img src={ExampleTemplatePaperImage} alt={tenThuTuc} />
        </div>
        <div className='flex flex-1 flex-col justify-start gap-1'>
          <div className='text-sm text-green-400'>{loaiThuTuc}</div>
          <div className='text-xl'>{tenThuTuc}</div>
          <div className='text-gray-500'>Mã tài liệu: {maThuTuc}</div>
          <div className='text-sm font-semibold text-gray-500'> {linhVuc}</div>
        </div>
      </div>
    </div>
  )
}
