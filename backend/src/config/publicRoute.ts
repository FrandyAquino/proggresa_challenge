import type { PublicRoute } from '../shared/interfaces/PublicRoute'

export const publicRoutes: PublicRoute[] = [
  {
    path: '/api/users/login',
    methods: '*',
  },
  {
    path: "/api/users",
    methods: ["POST"]
  },
  {
    path: "/api/articles",
    methods: ["GET"]
  }
]