import { ReactNode } from 'react'

type ColumnType<T> = {
  title: string
  dataIndex: keyof T
  key: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, record: T) => ReactNode
  sortable?: boolean
  width?: number
}

type TableProps<T> = {
  columns: ColumnType<T>[]
  data: T[]
  rowKey: keyof T
  pagination?: {
    currentPage: number
    pageSize: number
    totalItems: number
  }
  onPageChange?: (page: number) => void
  sort?: {
    field: keyof T
    order: 'asc' | 'desc'
  }
  onSort?: (field: keyof T, order: 'asc' | 'desc') => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = <T extends Record<string, any>>({ columns, data, rowKey, pagination, onPageChange, sort, onSort }: TableProps<T>) => {
  const handleSort = (field: keyof T) => {
    if (!sort || !onSort) return
    const newOrder = sort.order === 'asc' ? 'desc' : 'asc'
    onSort(field, newOrder)
  }

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200'>
      <table className='w-full border-collapse bg-white'>
        <thead className='bg-gray-50'>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500'
                style={{ width: column.width }}
              >
                <div className='flex items-center space-x-2'>
                  <span>{column.title}</span>
                  {column.sortable && onSort && (
                    <button onClick={() => handleSort(column.dataIndex)} className='hover:text-gray-700 focus:outline-none'>
                      {sort?.field === column.dataIndex && <span className='text-xs'>{sort.order === 'asc' ? '↑' : '↓'}</span>}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {data.map((item) => (
            <tr key={String(item[rowKey])} className='hover:bg-gray-50'>
              {columns.map((column) => (
                <td key={column.key} className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
                  {column.render ? column.render(item[column.dataIndex], item) : item[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && onPageChange && (
        <div className='flex items-center justify-between border-t border-gray-200 px-6 py-4'>
          <div className='text-sm text-gray-700'>
            Showing {(pagination.currentPage - 1) * pagination.pageSize + 1}-
            {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} of {pagination.totalItems} items
          </div>
          <div className='flex space-x-2'>
            <button
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className='rounded-md border border-gray-300 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50'
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage * pagination.pageSize >= pagination.totalItems}
              className='rounded-md border border-gray-300 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50'
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
