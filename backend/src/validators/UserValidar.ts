import z from 'zod'
import { zm, Field } from '../shared/functions/validator'

const userName: Field = { field: "Usuario", prefix: "El" }
const passwordName: Field = { field: "Contraseña", prefix: "La" }

export const userLoginSchema = z.object({
  username: 
    z.string(zm.string(userName))
      .min(5, zm.min({ ...userName, min: 3 }))
      .toLowerCase(),
  password:
    z.string(zm.string(passwordName))
      .min(3, zm.min({...passwordName, min: 10}))
})

export type LoginDTO = typeof userLoginSchema._type

export const registerSchema = z.object({
  username: 
    z.string(zm.string(userName))
      .min(5, zm.min({ ...userName, min: 3 }))
      .toLowerCase(),
  password:
    z.string(zm.string(passwordName))
      .min(3, zm.min({...passwordName, min: 10})),
})

export type RegisterDTO = typeof registerSchema._type

