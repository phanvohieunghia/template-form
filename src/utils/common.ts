import moment, { MomentInput } from 'moment'

export const formatRemainingTime = (time: MomentInput) => {
  const now = moment()
  const targetTime = moment(time)
  const diffInMinutes = now.diff(targetTime, 'minutes')
  const diffInHours = now.diff(targetTime, 'hours')
  const diffInDays = now.diff(targetTime, 'days')

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`
  } else if (diffInHours < 24) {
    return `${diffInHours}h`
  } else {
    return `${diffInDays}d`
  }
}

export const randomizeTime = (start: string, end: string): string => {
  // n seconds -> n minutes -> n hours -> n days
  const parseTime = (timeStr: string): number => {
    const unit = timeStr.slice(-1) // Get the last character (s, m, h, or d)
    const value = parseInt(timeStr.slice(0, -1)) // Get the numeric value
    let minutes = 0
    if (unit === 's') {
      minutes = value / 60 // Convert seconds to minutes
    } else if (unit === 'm') {
      minutes = value // If it's minutes
    } else if (unit === 'h') {
      minutes = value * 60 // Convert hours to minutes
    } else if (unit === 'd') {
      minutes = value * 24 * 60 // Convert days to minutes
    }
    return minutes
  }

  const startInMinutes = parseTime(start)
  const endInMinutes = parseTime(end)

  // Generate a random number of minutes within the given range
  const randomMinutes = Math.floor(Math.random() * (endInMinutes - startInMinutes + 1)) + startInMinutes
  // Get the current time
  const originalTime = new Date().getTime()
  // Calculate the randomized time
  const randomizedTime = new Date(originalTime - randomMinutes * 60000)
  return randomizedTime.toISOString()
}

export const formatMessageTime = (dateInput: MomentInput) => {
  const now = moment()
  const date = moment(dateInput)

  const secondsDiff = now.diff(date, 'seconds')
  const minutesDiff = now.diff(date, 'minutes')
  const daysDiff = now.diff(date, 'days')

  if (secondsDiff < 60) return 'Just now'
  if (minutesDiff < 60) return date.format('h:mm a') // e.g., "3:45 PM"
  if (daysDiff === 1) return 'Yesterday'
  if (daysDiff < 7) return date.format('dddd') // e.g., "Tuesday"
  if (now.year() === date.year()) return date.format('MMM D') // e.g., "Sep 12"
  return date.format('MMM D, YYYY') // e.g., "Dec 25, 2022"
}

export const validatePhoneNumber = (phoneNumber: string) => {
  const pattern = /^\d{10,11}$/
  const isPhone = pattern.test(phoneNumber)
  if (isPhone) return true
  return false
}

export const isEmptyInput = (input: string) => {
  if (input.trim()) {
    return true
  }
  return false
}

export const validatedEmail = (input: string) => {
  const pattern = /^[a-zA-z0-9]+@([a-z]+\.)+[\w-]{2,4}$/
  if (input.trim()) {
    const result: boolean = pattern.test(input)
    return result
  }
  return false
}

export const validPassword = (input: string) => {
  if (input.trim().length >= 8) {
    return true
  }
  return false
}

export const getSearchParams = () => {
  const params = new URLSearchParams(window.location.search)
  const queryObject: Record<string, string> = {}
  for (const [key, value] of params.entries()) {
    queryObject[key] = value
  }
  return queryObject
}

export const convertText = (text: string, findText: RegExp | string, replaceText: string) => {
  if (typeof text !== 'string') {
    throw new Error('The "text" parameter must be a string.')
  }

  if (!(findText instanceof RegExp) && typeof findText !== 'string') {
    throw new Error('The "findText" parameter must be a valid RegExp.')
  }

  if (typeof replaceText !== 'string') {
    throw new Error('The "replaceText" parameter must be a string.')
  }
  return text.replace(findText, replaceText)
}

export const getUrlEncoding = (text: string) => {
  console.log('#', text, '#')
  return text.replace(/ /g, '-').replace(/\//g, '%2F').replace(/\\/g, '%5C').replace(/%/g, '%25')
}

export const getUrlDecoding = (text: string) => {
  console.log('@', text, '@')
  return text.replace(/-/g, ' ').replace(/%2F/g, '/').replace(/%5C/g, '\\').replace(/%25/g, '%')
}
