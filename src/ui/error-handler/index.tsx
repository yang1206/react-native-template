import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { ErrorFallback } from './error-fallback'

function myErrorHandler(error: Error) {
  /* eslint-disable-next-line   no-console */
  console.log(error)
  //   captureException(error);
}

export function ErrorHandler({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
}
