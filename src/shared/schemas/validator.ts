import z from 'zod'

export const stringValidator = ({
  requiredMessage,
  invalidTypeMessage,
  min,
  max,
  lengthMessage
}: {
  requiredMessage: string
  invalidTypeMessage: string
  min: number
  max: number
  lengthMessage: string
}) =>
  z
    .string({
      required_error: requiredMessage,
      invalid_type_error: invalidTypeMessage
    })
    .nonempty(requiredMessage)
    .trim()
    .min(min, {
      message: lengthMessage
    })
    .max(max, {
      message: lengthMessage
    })
