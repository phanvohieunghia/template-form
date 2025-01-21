import { ZodError } from 'zod'
import { Response } from 'express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common'

import { AuthError, EntityError, ForbiddenError, StatusError, NotFoundError, ConflictError } from '@/utils/errors'

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    // const request = ctx.getRequest<Request>()

    // Kiểm tra môi trường để trả về thông báo lỗi cụ thể
    const isDev = process.env.NODE_ENV === 'development'

    // Xử lý các lỗi cụ thể

    if (
      exception instanceof EntityError ||
      exception instanceof ConflictError ||
      exception instanceof ForbiddenError ||
      exception instanceof StatusError ||
      exception instanceof NotFoundError
    ) {
      return response.status(exception.status).json({
        message: exception.message,
        statusCode: exception.status,
        ...(exception instanceof EntityError || exception instanceof ConflictError ? { errors: exception.fields } : {})
      })
    }

    if (exception instanceof AuthError) {
      return response
        .clearCookie('session_token', {
          path: '/',
          httpOnly: true,
          sameSite: 'none',
          secure: true
        })
        .status(exception.status)
        .json({
          message: exception.message,
          statusCode: exception.status,
          data: exception.data
        })
    }

    if (exception instanceof ZodError) {
      const { issues } = exception
      const errors = issues.map((issue) => ({
        ...issue,
        field: issue.path.join('.')
      }))
      const statusCode = HttpStatus.UNPROCESSABLE_ENTITY
      return response.status(statusCode).json({
        message: 'A validation error occurred when validating the data.',
        errors,
        statusCode
      })
    }

    if (exception instanceof PrismaClientKnownRequestError) {
      if (exception.code === 'P2025') {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'Không tìm thấy dữ liệu',
          statusCode: HttpStatus.NOT_FOUND
        })
      }
      console.error('Unhandled Prisma error:', exception)
    }

    // Xử lý lỗi không mong đợi
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const message = exception instanceof HttpException ? exception.message : 'An unexpected error occurred'

    // Trả về chi tiết lỗi nếu đang ở môi trường dev
    if (isDev) {
      return response.status(statusCode).json({
        message,
        statusCode,
        error:
          exception instanceof Error
            ? {
                name: exception.name,
                message: exception.message,
                stack: exception.stack
              }
            : exception
      })
    }

    // Trả về thông báo chung nếu ở môi trường production
    return response.status(statusCode).json({
      message,
      statusCode
    })
  }
}
