import ExampleTemplatePaperImage from '@/assets/images/example-template-paper.png'
import FileIcon from '@/assets/svgs/file.svg'
import LoadingIcon from '@/assets/svgs/loading.svg'
import { Pagination } from '@/components'
import { useAppSelector } from '@/hooks'
import { ProcedureService } from '@/stores'
import { ProcedureData, ThuTucUI } from '@/stores/procedure/interfaces'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './style.module.css'

export const Result = () => {
  const [searchParams] = useSearchParams()
  const procedureData = useAppSelector((state) => state.procedure)

  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      await ProcedureService.instance.getAll({ search: searchParams.get('search') || '' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <div className='flex items-end justify-between'>
        <div className={styles['title-1']}>
          <FileIcon fontSize={28} stroke={'gray'} />
          <span>Kết quả tìm kiếm</span>
        </div>
        {!loading && procedureData.data.rows && procedureData.data.rows.length !== 0 && (
          <span className='text-sm text-gray-400'>{procedureData.data.total} kết quả</span>
        )}
      </div>
      <div className='mt-6'>
        <ConditionalResult loading={loading} data={procedureData.data.rows} />
      </div>
    </div>
  )
}

type ConditionalResultType = {
  loading: boolean
  data: ProcedureData['rows']
}

const ConditionalResult = (props: ConditionalResultType) => {
  const { loading, data } = props
  const navigate = useNavigate()

  const handleClick = (data: ThuTucUI) => {
    navigate(`/tim-kiem/${data.tenThuTuc.replace(' ', '-')}-i.${data.thuTucId}`)
  }

  const handleChange = (data) => {
    console.log(data)
  }

  if (loading)
    return (
      <div className='flex justify-center'>
        <LoadingIcon fontSize={80} fill='green' />
      </div>
    )

  if (!data) return

  if (data.length === 0) return <div className='text-center text-2xl text-gray-500'>No data</div>

  if (data.length > 0)
    return (
      <>
        <div className='flex flex-col gap-4'>
          {data.map((item, index) => {
            return <Item data={item} key={index} onClick={() => handleClick(item)} />
          })}
        </div>
        <div className='mt-4 flex justify-center'>
          <Pagination total={60} onChange={handleChange} />
        </div>
      </>
    )
}

type ItemProps = {
  data: ThuTucUI
} & HTMLAttributes<HTMLDivElement>

const Item = (props: ItemProps) => {
  const { data, ...restProps } = props
  const { maThuTuc, tenThuTuc, linhVuc, loaiThuTuc } = data
  return (
    <div className='overflow-hidden rounded-lg border-[1px] border-transparent hover:cursor-pointer hover:border-green-600' {...restProps}>
      <div className='flex gap-3 rounded-lg border-[1px] border-green-600 p-4'>
        <div className='h-[100px] w-[200px] overflow-hidden rounded-lg border-[1px] border-green-300'>
          <img src={ExampleTemplatePaperImage} alt={tenThuTuc} />
        </div>
        <div className='flex flex-1 flex-col justify-center gap-1'>
          <div className='text-xs text-green-400'>{loaiThuTuc}</div>
          <div className='text-xl'>{tenThuTuc}</div>
          <div className='text-gray-500'>Mã tài liệu: {maThuTuc}</div>
        </div>
      </div>
    </div>
  )
}
