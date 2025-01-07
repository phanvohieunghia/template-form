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
