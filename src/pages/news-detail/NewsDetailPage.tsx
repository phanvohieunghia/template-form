import { useEffect, useState } from 'react'
import { News } from '../types'
import ExampleImage from '@/assets/images/image.webp'
import dayjs from 'dayjs'

const descriptionData = [
  {
    heading: 'Heading 1',
    content:
      'Naver, a global leader in cloud computing, digital services, and AI-powered infrastructure, provides enterprise cloud storage, file-sharing services, and secure digital collaboration tools. Their Cloud File Exchange System is a critical platform for managing large-scale file transfers, enabling cross-cloud integrations, and ensuring file accessibility across global teams. With the rise of hybrid cloud environments and remote collaboration, Naver required a high-speed, automated, and secure file transfer solution to optimize cloud file exchange, enhance file security, and improve efficiency in large-scale digital operations.\nThe integration of Exacoola enabled Naver to automate cloud file exchanges, secure sensitive enterprise file, and optimize collaboration between cloud storage providers, corporate clients, and remote workforces, ensuring fast, scalable, and secure cloud-based file management.',
  },
  {
    heading: 'Heading 2',
    content:
      'Naver, a global leader in cloud computing, digital services, and AI-powered infrastructure, provides enterprise cloud storage, file-sharing services, and secure digital collaboration tools. Their Cloud File Exchange System is a critical platform for managing large-scale file transfers, enabling cross-cloud integrations, and ensuring file accessibility across global teams. With the rise of hybrid cloud environments and remote collaboration, Naver required a high-speed, automated, and secure file transfer solution to optimize cloud file exchange, enhance file security, and improve efficiency in large-scale digital operations.\nThe integration of Exacoola enabled Naver to automate cloud file exchanges, secure sensitive enterprise file, and optimize collaboration between cloud storage providers, corporate clients, and remote workforces, ensuring fast, scalable, and secure cloud-based file management.',
  },
  {
    heading: 'Heading 3',
    content:
      'Naver, a global leader in cloud computing, digital services, and AI-powered infrastructure, provides enterprise cloud storage, file-sharing services, and secure digital collaboration tools. Their Cloud File Exchange System is a critical platform for managing large-scale file transfers, enabling cross-cloud integrations, and ensuring file accessibility across global teams. With the rise of hybrid cloud environments and remote collaboration, Naver required a high-speed, automated, and secure file transfer solution to optimize cloud file exchange, enhance file security, and improve efficiency in large-scale digital operations.\nThe integration of Exacoola enabled Naver to automate cloud file exchanges, secure sensitive enterprise file, and optimize collaboration between cloud storage providers, corporate clients, and remote workforces, ensuring fast, scalable, and secure cloud-based file management.',
  },
]

const NewsDetailPage = () => {
  const [news, setNews] = useState<News & { description: typeof descriptionData }>()

  const fetchData = async () => {
    setNews({
      id: 'news2',
      title: 'Tech Giants Announce Groundbreaking AI Innovations',
      date: '2025-02-24T14:30:00Z',
      author: 'John Smith',
      content: 'Major technology companies unveiled new AI breakthroughs at the annual tech conference, promising to reshape various industries.',
      url: 'https://example.com/news/tech-giants-ai-innovations',
      image: 'https://example.com/images/ai.jpg',
      category: 'Technology',
      tags: ['technology', 'AI', 'innovation', 'conference'],
      source: 'TechCrunch',
      location: 'San Francisco, USA',
      readTime: '4 min',
      popularity: 92,
      description: descriptionData,
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <div className='mt-10 flex justify-between'>
        <span className='font-semibold text-gray-400'>Category 2</span>
        <span>{dayjs(news?.date).format('ll')}</span>
      </div>
      <h1 className='mb-10 mt-10 text-4xl'>{news?.title}</h1>
      <img src={ExampleImage} alt='error image' className='block overflow-hidden rounded-xl' />
      <div className='mt-10'>
        {descriptionData.map((item) => (
          <Section data={item} />
        ))}
      </div>
    </div>
  )
}

type SectionProps = {
  data: {
    heading: string
    content: string
  }
}

const Section = (props: SectionProps) => {
  const { data } = props

  return (
    <div className='mb-6'>
      <h2 className='text-2xl font-semibold'>{data.heading}</h2>
      <p className='text-lg'>{data.content}</p>
    </div>
  )
}

export default NewsDetailPage
