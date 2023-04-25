import type { AxiosError } from 'axios'
import { showMessage } from 'react-native-flash-message'

// for onError react queries and mutations
export function showError(error: AxiosError) {
  const description = extractError(error?.response?.data).trimEnd()

  showMessage({
    message: 'Error',
    description,
    type: 'danger',
    duration: 4000,
    icon: 'danger',
  })
}

export function showErrorMessage(message = 'Something went wrong ') {
  showMessage({
    message,
    type: 'danger',
    duration: 4000,
  })
}

export function extractError(data: unknown): string {
  if (typeof data === 'string')
    return data

  if (Array.isArray(data)) {
    const messages = data.map((item) => {
      return `  ${extractError(item)}`
    })

    return `${messages.join('')}`
  }

  if (typeof data === 'object' && data !== null) {
    const messages = Object.entries(data).map((item) => {
      const [key, value] = item
      const separator = Array.isArray(value) ? ':\n ' : ': '

      return `- ${key}${separator}${extractError(value)} \n `
    })
    return `${messages.join('')} `
  }
  return 'Something went wrong '
}
