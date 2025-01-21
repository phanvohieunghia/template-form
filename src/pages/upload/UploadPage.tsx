import CloseIcon from '@/assets/svgs/close.svg'
import FileIcon from '@/assets/svgs/file.svg'
import UploadIcon from '@/assets/svgs/upload.svg'
import { Button } from '@/components'
import React, { useState } from 'react'

type FileState = {
  file: File
  uploadProgress: number
  isUploading: boolean
}

export const UploadPage = () => {
  const [files, setFiles] = useState<FileState[]>([])
  const [isUploading, setIsUploading] = useState(false)

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

  const payBill = () => {}

  return (
    <div className='mx-auto w-full max-w-[600px] rounded-lg bg-white p-6 shadow-lg'>
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
  )
}
