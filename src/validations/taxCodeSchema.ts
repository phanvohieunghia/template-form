import { z } from 'zod'

const validateResearchCodeTaxSchema = z.object({
  search: z.string().min(1, { message: 'Bạn chưa nhập mã số thuế.' }),
})
export type ResearchCodeTaxVariables = z.infer<typeof validateResearchCodeTaxSchema>

export const validateResearchCodeTax = <T>(data: T) => {
  const result = validateResearchCodeTaxSchema.safeParse(data)

  if (!result.success) {
    const formattedError = result.error.format()
    return {
      search: formattedError.search?._errors[0] || '',
    }
  }
  return null // No errors
}
