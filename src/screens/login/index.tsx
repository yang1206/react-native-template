import React from 'react'

import { useAuth } from '@/stores'
import { FocusAwareStatusBar } from '@/ui'
import { useSoftKeyboardEffect } from '@/utils'

import type { LoginFormProps } from './login-form'
import { LoginForm } from './login-form'

export const Login = () => {
  const signIn = useAuth.use.signIn()
  useSoftKeyboardEffect()

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data)
    signIn({ access: 'access-token', refresh: 'refresh-token' })
  }
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  )
}
