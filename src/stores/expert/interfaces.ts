import { GetAllMentorsResType, MentorType } from '@/shared/schemas/mentor.schema'

type Expert = MentorType

export type ExpertUI = Pick<Expert, 'mentorId' | 'userId' | 'expertise' | 'rating' | 'status'> & { user: ExpertUser }

export type ExpertUser = GetAllMentorsResType['data']['mentors'][0]['user']

export type ExpertList = {
  total: number
  rows: ExpertUI[] | undefined
}

export type ExpertResponse = {
  error?: Error
  [key: string]: unknown
}

export type GetAllExpertResponse = GetAllMentorsResType
export type GetAllExpertVariables = {
  search?: string
  page?: number
  limit?: number
}

export type PayBillResponse = {
  momoUrl?: string
} & ExpertResponse
