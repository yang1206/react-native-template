import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'

export const queryClient = new QueryClient(
  {
    defaultOptions: { queries: { retry: 2 } },
  },
)
if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    // @ts-expect-error QueryClient has different types in react-query and @tanstack/react-query but we are good here
    addPlugin({ queryClient })
  })
}

export function APIProvider({ children }: { children: React.ReactNode }) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
