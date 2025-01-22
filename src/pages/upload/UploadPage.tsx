import expertBioData from '@/assets/mock-data/expert.json'
import CloseIcon from '@/assets/svgs/close.svg'
import FileIcon from '@/assets/svgs/file.svg'
import UploadIcon from '@/assets/svgs/upload.svg'
import { Button } from '@/components'
import { useAppSelector } from '@/hooks'
import { ExpertService } from '@/stores'
import { ExpertUI } from '@/stores/expert/interfaces'
import clsx from 'clsx'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import styles from './styles.module.css'

type FileState = {
  file: File
  uploadProgress: number
  isUploading: boolean
}

export const UploadPage = () => {
  const [files, setFiles] = useState<FileState[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { selectedExpert, index: selectedExpertIndex } = useAppSelector((state) => state.expert)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setIsUploading(true)
      const newFiles = Array.from(event.target.files).map((file) => ({
        file,
        uploadProgress: 0,
        isUploading: false,
      }))
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
      uploadFileProcess()
    }
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const uploadFileProcess = () => {
    const interval = setInterval(() => {
      setFiles((prevFiles) => {
        const uploadingFileIndex = prevFiles.findIndex((item) => item.uploadProgress < 100)
        if (uploadingFileIndex === -1) {
          clearInterval(interval)
          setIsUploading(false)
          return [...prevFiles]
        } else {
          const newFiles = [...prevFiles]
          newFiles[uploadingFileIndex].uploadProgress += 10
          newFiles[uploadingFileIndex].isUploading = false
          if (newFiles[uploadingFileIndex].uploadProgress === 100) newFiles[uploadingFileIndex].isUploading = false
          else newFiles[uploadingFileIndex].isUploading = true
          return [...newFiles]
        }
      })
    }, 50)
  }

  const payBill = async () => {
    const { momoUrl } = await ExpertService.instance.payBill()
    if (momoUrl) {
      window.location.href = momoUrl
    }
  }

  useEffect(() => {
    if (!isUploading && files.length > 0) {
      ExpertService.instance.setFiles(files.map((item) => item.file))
    }
  }, [files, isUploading])

  return (
    <div className='flex items-start gap-6 p-6'>
      {selectedExpert && <ProfileCard data={selectedExpert} index={selectedExpertIndex} />}

      <div className='flex-1 rounded-lg bg-white p-6 shadow-lg'>
        <div className='rounded-lg border-2 border-dashed border-gray-300 p-6 text-center'>
          <input id='file-upload' multiple type='file' className='hidden' onChange={handleFileChange} />
          <label htmlFor='file-upload' className='flex cursor-pointer flex-col items-center'>
            <div className='mb-2 text-2xl text-blue-600'>
              <UploadIcon stroke={'#15803d'} />
            </div>
            <span className='text-green-600 underline'>Choose file</span>
            <p className='mt-2 text-sm text-gray-500'>Drag and Drop file here or click to upload</p>
            <p className='mt-1 text-xs text-gray-400'>Supported formats: DOC, DOCX, PDF (Max 25MB)</p>
          </label>
        </div>

        {files.map((fileState, index) => (
          <div key={index} className='mt-4 rounded-md border-2 border-gray-100 p-2'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white'>
                  <FileIcon fontSize={24} />
                </div>
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-700'>{fileState.file.name}</p>
                  <p className='text-xs text-gray-400'>{(fileState.file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <Button
                icon={<CloseIcon />}
                className='text-gray-400 hover:text-red-500'
                onClick={() => removeFile(index)}
                disabled={fileState.isUploading}
                type='text'
                shape='circle'
              />
            </div>
            <div className='relative mt-2 h-2 overflow-hidden rounded-full bg-gray-200'>
              <div
                className={`h-2 rounded-full ${fileState.uploadProgress === 100 ? 'bg-green-600' : 'bg-blue-600'}`}
                style={{ width: `${fileState.uploadProgress}%` }}
              ></div>
            </div>
            <p className='mt-1 text-right text-sm text-gray-500'>{fileState.uploadProgress}%</p>
          </div>
        ))}

        <Button block className={`mt-3 rounded-md bg-blue-600 px-4 py-2 text-white`} disabled={files.length === 0 || isUploading} onClick={payBill}>
          {isUploading ? 'Uploading...' : 'Thanh toán'}
        </Button>
      </div>
    </div>
  )
}
type ProfileCardProps = {
  data: ExpertUI
  index?: number
} & HTMLAttributes<HTMLDivElement>

const ProfileCard = (props: ProfileCardProps) => {
  const { data, index } = props
  const { user } = data

  return (
    <div className={clsx('relative w-full max-w-sm overflow-hidden rounded-xl bg-white p-6 shadow-lg')}>
      <div className={styles['background']}></div>
      <div className='relative flex justify-center'>
        <div className={clsx(styles['box-shadow'], 'h-24 w-24 overflow-hidden rounded-full')}>
          <img src={data.user.avatar as string} alt='Profile' className='h-full w-full object-cover' />
        </div>
      </div>

      <div className='relative mt-4 text-center'>
        <h2 className='text-xl font-bold text-gray-900'>{user.name}</h2>
        <p className='text-sm text-gray-600'>Chuyên gia tư vấn</p>
      </div>

      <div className='relative mt-6'>
        <h3 className='text-sm font-bold text-gray-700'>GIỚI THIỆU</h3>
        <p className='mt-2 text-sm text-gray-600'>{expertBioData[index as number]}</p>
      </div>

      <div className='relative mt-6 flex justify-center space-x-4'>
        <a href='#' className='text-gray-400 hover:text-blue-600' aria-label='Facebook'>
          <i className='fab fa-facebook-f'></i>
        </a>
        <a href='#' className='text-gray-400 hover:text-blue-400' aria-label='Twitter'>
          <i className='fab fa-twitter'></i>
        </a>
        <a href='#' className='text-gray-400 hover:text-purple-600' aria-label='Instagram'>
          <i className='fab fa-instagram'></i>
        </a>
        <a href='#' className='text-gray-400 hover:text-blue-700' aria-label='LinkedIn'>
          <i className='fab fa-linkedin-in'></i>
        </a>
      </div>
    </div>
  )
}
