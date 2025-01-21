import { ZodTypeAny } from 'zod'
import { EntityError } from '@/utils/errors'
import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodTypeAny) {}

  transform(value: any) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      throw new EntityError(error)
    }
  }
}
