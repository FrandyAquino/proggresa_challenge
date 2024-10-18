import {ZodError, } from 'zod'
import { Response } from 'express'
import { ERROR_STATUS } from '../../config/constants'

interface ParamsResponseSuccess {
  message: string
  data?: any
}

export const successResponse = (res: Response, { message, data }: ParamsResponseSuccess): any => {
  return res.status(200).json({
    message,
    data,
    error: false,
  })
}

interface ResponseError {
  message: string
  code: keyof typeof ERROR_STATUS
  extra?: Record<string, any>
}

export const errorResponse = (res: Response, options: ResponseError | ResponseError[], extra?: Record<string, any> | undefined): any => {
  if (options instanceof Array) {
    return res.status(ERROR_STATUS[options[0].code]).json({
      messages: options,
      details: extra,
      error: true,
    })
  }

  return res.status(ERROR_STATUS[options.code]).json({
    messages: [options],
    details: extra,
    error: true,
  })
}

interface ParamsZodResponse {
  error: Error
}

export const errorZodResponse = (res: Response, { error }: ParamsZodResponse) => {
  res.status(400).json({
    messages: error instanceof ZodError ? error.errors : [error.message],
    error: true,
  })
}

interface PaginationResult {
  data: any[]
  metadata: {
    total: number
    page: number
    max: number
    next: boolean
    previous: boolean
    totalPages: number
  }
  message: string
}

export const responsePagination = (res: Response, { message, data, metadata }: PaginationResult) => {
  return res.status(200).json({
    message,
    data,
    metadata,
    error: false,
  })
}