import LoadingIcon from '@/assets/svgs/loading.svg'
import { Button, ExpertAdviceModal, Tab, TabProps } from '@/components'
import { useAppSelector } from '@/hooks'
import { mauGiayToType } from '@/shared/schemas/mauGiayTo.schema'
import { ProcedureService } from '@/stores'
import { convertText, EVENT_NAME, EventManager } from '@/utils'
import { Collapse, CollapseProps, Table } from 'antd'
import clsx from 'clsx'
import { HTMLAttributes, PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './styles.css'
import styles from './styles.module.css'

export const DetailPage = () => {
  const { pathname } = useLocation()
  const { procedureDetail } = useAppSelector((state) => state.procedure)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

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

  const tabData: TabProps['items'] = useMemo(() => {
    return (
      procedureDetail?.cachThucThucHiens.map((item) => ({
        label: item.hinhThucNop ?? '',
        key: item.id.toString(),
        children: (
          <div key={item.id}>
            <div className='mt-2 flex'>
              <span className={styles['card-tab-item-title']}>Thời hạn giải quyết</span>
              <span className={styles['card-tab-item-value']}>{item.thoiHanGiaiQuyet}</span>
            </div>
            <div className='mt-2 flex'>
              <span className={styles['card-tab-item-title']}>Phí, lệ phí</span>
              <span className={styles['card-tab-item-value']}>{item.lePhi === '' && '0 Đồng. Không quy định.'}</span>
            </div>
            <div className='mt-2 flex'>
              <span className={styles['card-tab-item-title']}>Mô tả</span>
              <span className={styles['card-tab-item-value']}>{item.moTa}</span>
            </div>
          </div>
        ),
      })) ?? []
    )
  }, [procedureDetail])

  const collapseData: CollapseProps['items'] = useMemo(() => {
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
        render(text: mauGiayToType[]) {
          const localStyle = 'font-semibold text-green-600'
          const handleClick = () => {
            EventManager.emit<ExpertAdviceModal>(EVENT_NAME.TEST_MODAL_OPEN, {
              title: 'Chuyên gia tư vấn',
              content: (
                <>
                  Chúng tôi muốn <span className={localStyle}>chắc chắn</span> rằng bạn sẽ có được những lời khuyên chuyên môn nhất. Vì vậy, tôi xin
                  phép gợi ý một số <span className={localStyle}>chuyên gia</span> có <span className={localStyle}>kiến thức chuyên sâu</span> để hỗ
                  trợ bạn trực tiếp.
                </>
              ),
              onConfirm: () => {
                navigate('/expert')
              },
            })
          }

          return text.map((item, index) => (
            <Button
              type='link'
              onClick={handleClick}
              key={index}
              // href={`https://csdl.dichvucong.gov.vn/web/jsp/download_file.jsp?ma='${item.mauGiayToIdDVC}'`}
            >
              {item.tenMauGiayTo}
            </Button>
          ))
        },
      },
    ]

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
      <div className='flex space-x-4'>
        <Card title='Cách thức thực hiện' className='flex-1'>
          <Tab defaultActiveKey='1' items={tabData} />
        </Card>
        <Card title='Thông tin khác' className='flex-1'>
          {[
            { label: 'Cơ quan thực hiện', value: procedureDetail?.coQuanThucHien },
            { label: 'Loại thủ tục', value: procedureDetail?.loaiThuTuc },
            { label: 'Mã thủ tục', value: procedureDetail?.maThuTuc },
            { label: 'Số quyết định', value: procedureDetail?.soQuyetDinh },
            { label: 'Lĩnh vực', value: procedureDetail?.linhVuc },
            { label: 'Đối tượng thực hiện', value: procedureDetail?.doiTuongThucHien },
            { label: 'Cấp thực hiện', value: procedureDetail?.capThucHien },
          ].map((item, index) => (
            <div className='mt-2 flex' key={index}>
              <span className={styles['card-tab-item-title']}>{item.label}</span>
              <span className={styles['card-tab-item-value']}>{item.value}</span>
            </div>
          ))}
        </Card>
      </div>
      <Card title='Thành phần hồ sơ'>
        <Collapse items={collapseData} className='noah' />
      </Card>
      <Card title='Quy trình thực hiện'>
        {convertText(procedureDetail?.trinhTuThucHien ?? '', /Bước/g, '-Bước')
          .split('-')
          .map((item, index) => (
            <div className='mt-3' key={index}>
              {item}
            </div>
          ))}
      </Card>
      <ExpertAdviceModal />
    </div>
  )
}

type CardProps = {
  title: string
  data?: unknown
} & PropsWithChildren &
  HTMLAttributes<HTMLDivElement>

const Card = (props: CardProps) => {
  const { title, children, className, ...restProps } = props
  return (
    <div className={clsx('overflow-hidden rounded-lg border-2 border-gray-200', className)} {...restProps}>
      <div className='bg-green-100 p-2 text-2xl font-semibold text-gray-500'>{title}</div>
      <div className='p-2'>{children}</div>
    </div>
  )
}
