export type prefix = '' | 'La' | 'El' | 'Las'

export interface Field  {
  field: string
  prefix: prefix
}

export const zm = {
  string: ({ field = '', prefix = '' }: { field?: string; prefix?: prefix } = {}) => ({
    invalid_type_error: (field ? `${prefix} ${field} debe ser un string` : `${prefix} campo debe ser un string`).trim(),
    required_error: (`${prefix} ${field} es requerido`).trim(),
  }),
  email: ({ field = '', prefix = '' }: { field?: string; prefix?: prefix } = {}) => ({
    message: (`${prefix} ${field} debe ser un email válido`).trim(),
  }),
  min: ({ field = '', min, prefix = '' }: { field: string; min: number; prefix?: prefix }) => ({
    message: (`${prefix} ${field} debe tener al menos ${min} caracteres`).trim(),
  }),
  max: ({ max, field = '', prefix = '' }: { field?: string; max: number; prefix?: prefix }) => ({
    message: (field ? `${prefix} ${field} debe tener como máximo ${max} caracteres` : `El campo debe tener como máximo ${max} caracteres`).trim(),
  }),
  refine: ({ field = '', prefix = '' }: { field?: string; prefix?: prefix }) => ({
    message: (field ? `${prefix} ${field} no es válido` : `${prefix} campo no es válido`).trim(),
  }),
  url: ({ field = '', prefix = '' }: { field?: string; prefix?: prefix }) => ({
    message: (field ? `${prefix} ${field} debe ser una URL válida` : 'La URL debe ser válida').trim(),
  }),
  number: ({ field = '', prefix = '' }: { field?: string; prefix?: prefix }) => ({
    invalid_type_error: (field ? `${prefix} ${field} debe ser un número` : `${prefix} campo debe ser un número`).trim(),
    required_error: (`${prefix} ${field} es requerido`).trim(),
  }),
  boolean: ({ field = '', prefix = '' }: { field?: string; prefix?: prefix } = {}) => ({
    invalid_type_error: (field ? `${prefix} ${field} debe ser un booleano` : `${prefix} campo debe ser un booleano`).trim(),
    required_error: (`${prefix} ${field} es requerido`).trim(),
  }),
}