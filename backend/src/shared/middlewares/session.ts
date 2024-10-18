import type { NextFunction, Request, Response } from 'express'
import type { Method } from '../interfaces/PublicRoute'
import { User } from '../../interfaces/User'
import UserModel from '../../models/User.model'
import { errorResponse } from '../functions/response'
import { publicRoutes } from '../../config/publicRoute'
import { isExpired, verifyToken } from '../functions/jwt'

export const sessionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { method, headers, path } = req

  if (!path.startsWith('/api')) {
    return next()
  }

  const route = publicRoutes.find((route) => route.path === path)

  if (!route) {
    return errorResponse(res, {
      code: 'AUTHENTICATION_ERROR',
      message: 'Unauthorized access to this route',
    })
  }

  if (route.methods === '*') {
    return next()
  }

  if (route.methods.includes(method as Method)) {
    return next()
  }

  const { authorization } = headers

  if (!authorization) {
    return errorResponse(res, {
      code: 'AUTHENTICATION_ERROR',
      message: 'No token provided',
    })
  }

  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') {
    return errorResponse(res, {
      code: 'AUTHENTICATION_ERROR',
      message: 'Token malformatted',
    })
  }

  try {
    verifyToken(token)
    const payload = verifyToken(token);
    console.log('Payload:', payload);
  } catch (_error) {
    return errorResponse(res, {
      code: 'AUTHENTICATION_ERROR',
      message: 'Token invalid',
    })
  }

  const { expired, payload } = isExpired<User>(token)

  if (expired) {
    return errorResponse(res, {
      code: 'AUTHENTICATION_ERROR',
      message: 'Token expired',
    })
  }

  try {
    const result = await UserModel.findById(payload._id)

    if (!result) {
      return errorResponse(res, {
        code: 'AUTHENTICATION_ERROR',
        message: 'User not found',
      })
    }

    const payloadData = result as any

    req.user = payloadData
  } catch (_error) {
    return errorResponse(res, {
      code: 'AUTHENTICATION_ERROR',
      message: 'Unauthorized access to this route',
    })
  }

  return next()
}