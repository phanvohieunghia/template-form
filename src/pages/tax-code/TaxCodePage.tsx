import { Button, Input } from '@/components'
import { Tabs, TabsProps } from 'antd'
import SearchIcon from '@/assets/svgs/search.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ResearchCodeTaxVariables, validateResearchCodeTax } from '@/validations'
import { Dispatch, SetStateAction, useState } from 'react'
import { CodeTaxApiService } from '@/services'
import { TaxInformation } from '@/stores/code-tax/interfaces'

const TaxCodePage = () => {
  const [result, setResult] = useState<TaxInformation>({
    address: '',
    id: '',
    internationalName: '',
    name: '',
    shortName: '',
  })

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tra cứu mã số thuế',
      children: (
        <LocalTab
          data={{
            title: 'Mã số thuế',
            titleWidth: 80,
            placeholder: 'Nhập mã số thuế',
          }}
          onResult={setResult}
        />
      ),
    },
    {
      key: '2',
      label: 'Tra cứu mã ngành',
      children: (
        <LocalTab
          data={{
            title: 'Mã ngành nghề kinh doanh',
            titleWidth: 180,
            placeholder: 'Nhập mã ngành',
          }}
          onResult={setResult}
        />
      ),
    },
  ]

  const onChange = () => {}

  return (
    <div>
      <div className='rounded-lg bg-blue-200 p-10'>
        <h1 className='mb-3 text-center text-3xl font-bold text-gray-700'>Tra cứu nhanh</h1>
        <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
      </div>
      {result && (
        <div className='mx-auto mt-10 max-w-[600px]'>
          <div className='space-x-3 border-b-2 pb-4 font-bold'>
            <span>{result.id}</span>
            <span>{result.name}</span>
          </div>
          <div className='mt-4 space-y-4'>
            <div className='border-b-[1px] pb-4'>
              <Input titlePosition='left' titleClassName='w-[100px]' title='Tên quốc tế' readonly value={result.internationalName} />
            </div>
            <div className='border-b-[1px] pb-4'>
              <Input titlePosition='left' titleClassName='w-[100px]' title='Tên viết tắt' readonly value={result.shortName} />
            </div>
            <div className='border-b-[1px] pb-4'>
              <Input titlePosition='left' titleClassName='w-[100px]' title='Mã số thuế' readonly value={result.id} />
            </div>
            <div className='pb-4'>
              <Input titlePosition='left' titleClassName='w-[100px]' title='Địa chỉ' readonly value={result.address} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const defaultFrom = { search: '' }

type LocalTabProps = {
  data: {
    title: string
    titleWidth: number
    placeholder: string
  }
  onResult: Dispatch<SetStateAction<TaxInformation>>
}
const LocalTab = (props: LocalTabProps) => {
  const { data, onResult } = props
  const { title, titleWidth, placeholder } = data

  const [errorMessage, setErrorMessage] = useState<ResearchCodeTaxVariables>(defaultFrom)
  const { register, handleSubmit } = useForm<{ search: string }>({
    defaultValues: { search: '' },
  })

  const onSubmit: SubmitHandler<ResearchCodeTaxVariables> = async (data) => {
    const errors = validateResearchCodeTax(data)
    if (errors) {
      setErrorMessage(errors)
    } else {
      const response = await CodeTaxApiService.instance.getOne(data.search)
      onResult(response.data)
    }
  }

  return (
    <div className='mx-auto mt-5 max-w-[600px] space-y-3'>
      <Input
        placeholder={placeholder}
        message={errorMessage.search}
        title={title}
        titlePosition='left'
        titleStyle={{ width: titleWidth }}
        {...register('search')}
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        icon={<SearchIcon />}
        type='primary'
        className='button-primary'
        style={{ marginLeft: titleWidth + 16 }}
      >
        Tra cứu
      </Button>
    </div>
  )
}

export default TaxCodePage
