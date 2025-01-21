import { applyDecorators } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { z } from 'zod'

export function ApiZodBody(schema: z.ZodObject<any>, description?: string) {
  const properties = {}
  Object.keys(schema.shape).forEach((key) => {
    const prop = schema.shape[key]
    // Chuyển đổi Zod schema thành OpenAPI schema (cần xử lý từng loại kiểu dữ liệu)
    properties[key] = { type: prop._def.typeName.toLowerCase() }
  })

  return applyDecorators(
    ApiBody({
      description: description || 'Request body',
      schema: {
        type: 'object',
        properties,
        required: Object.keys(properties)
      }
    })
  )
}
