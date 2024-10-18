import { Request } from 'express'

interface RequestDTO<TBody = any, TQuery = any, TParams = any> extends Request {
  ctx: {
    body: TBody
    params: TParams
    query: TQuery
  }
}