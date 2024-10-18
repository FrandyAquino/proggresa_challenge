export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'CONNECT' | 'TRACE'

export interface PublicRoute {
  path: string
  methods: Method[] | '*'
}