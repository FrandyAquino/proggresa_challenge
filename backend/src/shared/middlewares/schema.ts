import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'
import { errorZodResponse } from '../functions/response'

type FromValidation = 'body' | 'params' | 'query'

export const schemaValidatorMiddleware = (from: FromValidation, schema: ZodSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data: Record<string, any> = req[from]

    const result = await schema.safeParseAsync(data)

    if (!result.success) {
      return errorZodResponse(res, {
        error: result.error,
      })
    }

    req.ctx = {
      ...req.ctx,
      [from]: {
        ...req[from],
        ...result.data,
      },
    }

    next()
  }
}