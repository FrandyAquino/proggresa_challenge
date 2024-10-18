import z from 'zod'
import { zm, Field } from '../shared/functions/validator'

const emailName: Field = { field: "Correo Electronico", prefix: "El" }
const passwordName: Field = { field: "Contraseña", prefix: "La" }

export const userLoginSchema = z.object({
  username: 
    z.string(zm.string(emailName))
      .min(10, zm.min({ ...emailName, min: 3 }))
      .toLowerCase(),
  password:
    z.string(zm.string(passwordName))
      .min(10, zm.min({...passwordName, min: 10}))
})

export type LoginDTO = typeof userLoginSchema._type

export const registerSchema = z.object({
  username: 
    z.string(zm.string(emailName))
      .min(10, zm.min({ ...emailName, min: 3 }))
      .toLowerCase(),
  password:
    z.string(zm.string(passwordName))
      .min(10, zm.min({...passwordName, min: 10})),
})

export type RegisterDTO = typeof registerSchema._type

