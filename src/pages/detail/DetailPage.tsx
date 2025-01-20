import LoadingIcon from '@/assets/svgs/loading.svg'
import { Tab, TabProps } from '@/components'
import { useAppSelector } from '@/hooks'
import { ProcedureService } from '@/stores'
import { Collapse, CollapseProps, Table } from 'antd'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './styles.module.css'

const columns = [
  {
    title: 'Loại giấy tờ',
    dataIndex: 'tenGiayTo',
    key: 'name',
  },
  {
    title: 'Bản chính',
    dataIndex: 'soLuongBanChinh',
    key: 'soLuongBanChinh',
  },
  {
    title: 'Bản sao',
    dataIndex: 'soLuongBanSao',
    key: 'soLuongBanSao',
  },
  {
    title: 'Mẫu đơn, tờ khai',
    dataIndex: 'mauGiayTos',
    key: 'mauGiayTos',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(text: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return text.map((item: any) => <div>{item.tenMauGiayTo}</div>)
    },
  },
]

export const DetailPage = () => {
  const { pathname } = useLocation()
  const { procedureDetail } = useAppSelector((state) => state.procedure)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      setLoading(true)

      const splittedPathname = pathname.split('-i.')
      const id = splittedPathname[splittedPathname.length - 1]
      await ProcedureService.instance.getOne({ id })
    } finally {
      setLoading(false)
    }
  }

  console.log(procedureDetail)
  const tabData: TabProps['items'] = useMemo(() => {
    return (
      procedureDetail?.cachThucThucHiens.map((item) => ({
        label: item.hinhThucNop ?? '',
        key: item.id.toString(),
        children: (
          <div className='space-y-2' key={item.id}>
            <div>
              <span className={styles['card-tab-item-title']}>Thời hạn giải quyết</span>
              <span className={styles['card-tab-item-value']}>{item.thoiHanGiaiQuyet}</span>
            </div>
            <div>
              <span className={styles['card-tab-item-title']}>Phí, lệ phí</span>
              <span className={styles['card-tab-item-value']}>{item.lePhi === '' && '0 Đồng. Không quy định.'}</span>
            </div>
            <div>
              <span className={styles['card-tab-item-title']}>Mô tả</span>
              <span className={styles['card-tab-item-value']}>{item.moTa}</span>
            </div>
          </div>
        ),
      })) ?? []
    )
  }, [procedureDetail])

  const collapseData: CollapseProps['items'] = useMemo(() => {
    return (
      procedureDetail?.thanhPhanHoSos.map((item, index) => ({
        label: item.tenThanhPhan,
        key: index.toString(),
        children: (
          <div className='space-y-2' key={item.thanhPhanHoSoId}>
            <Table columns={columns} dataSource={item.giayTos} pagination={false} />
          </div>
        ),
      })) ?? []
    )
  }, [procedureDetail])

  useEffect(() => {
    fetchData()
  }, [])

  if (loading)
    return (
      <div className='flex justify-center'>
        <LoadingIcon fontSize={80} fill='green' />
      </div>
    )
  if (!procedureDetail) return
  return (
    <div className='space-y-4'>
      <div className='pb-5 text-3xl font-semibold' style={{ wordSpacing: '2px' }}>
        {procedureDetail?.tenThuTuc}
      </div>

      <Card title='Cách thức thực hiện'>
        <Tab defaultActiveKey='1' items={tabData} />
      </Card>
      <Card title='Thành phần hồ sơ'>
        <Collapse items={collapseData} />
      </Card>
      <Card title='Quy trình thực hiện'>
        {procedureDetail?.trinhTuThucHien?.split('-').map((item, index) => (
          <div className='mt-3' key={index}>
            {item}
          </div>
        ))}
      </Card>
    </div>
  )
}

type CardProps = {
  title: string
  data?: unknown
} & PropsWithChildren

const Card = (props: CardProps) => {
  const { title, children } = props
  return (
    <div className='overflow-hidden rounded-lg border-2 border-gray-200'>
      <div className='bg-green-100 p-2 text-2xl font-semibold text-gray-500'>{title}</div>
      <div className='p-2'>{children}</div>
    </div>
  )
}
