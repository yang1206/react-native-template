import type { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'

import { client } from '../common'
import type { Post } from './types'

type Variables = { id: number }
type Response = Post

export const usePost = createQuery<Response, Variables, AxiosError>(
  {
    primaryKey: 'posts',
    queryFn: async ({ queryKey: [primaryKey, variables] }) => {
      const response = await client.get(`${primaryKey}/${variables.id}`)
      return response.data
    },
    enabled: data => !data,
  },
)
