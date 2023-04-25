import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type Animated from 'react-native-reanimated'
import { withTiming } from 'react-native-reanimated'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button, ControlledInput, Text, TouchableOpacity, View } from '@/ui'
import { useAuthStore } from '@/store'
import { t } from '@/locales'

interface BottomFormProps {
  translateY: Animated.SharedValue<number>
}
function BottomForm({ translateY }: BottomFormProps) {
  const [formType, setFormType] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuthStore()
  useEffect(() => {
    translateY.value = 300
    translateY.value = withTiming(0, { duration: 1000 })
  }, [translateY])

  // 定义表单验证规则
  const loginSchema = z.object({
    email: z.string().email('请输入有效的邮箱地址'),
    password: z.string().min(6, '密码长度至少为 6 个字符'),
  })

  const registerSchema = z.object({
    email: z.string().email('请输入有效的邮箱地址'),
    password: z.string().min(6, '密码长度至少为 6 个字符'),
    confirmPassword: z.string().min(6, '密码长度至少为 6 个字符'),
  })

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formType === 'login' ? loginSchema : registerSchema),
  })
  // 定义切换表单类型的处理函数
  function handleSwitchFormType() {
    // 清空表单验证状态
    reset({
      email: '',
      password: '',
      confirmPassword: '',
    })

    // 切换表单类型
    setFormType(formType === 'login' ? 'register' : 'login')
  }
  function onSubmit(data: string) {
    if (formType === 'login')
      login(data)
  }
  return (
    <View style={styles.formContainer}>
      {/* 切换表单类型 */}
      <TouchableOpacity onPress={handleSwitchFormType}>
        <Text style={styles.formTypeText}>{formType === 'login' ? t('Login.goRegister') : t('Login.goLogin')}</Text>
      </TouchableOpacity>

      {/* 表单项 */}
      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label={t('Login.email')}
        keyboardType="email-address"
        placeholder={t('Login.emailPlaceholder')}
      />
      <View className="relative">
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label={t('Login.password')}
          secureTextEntry={!showPassword}
          placeholder={t('Login.passwordPlaceholder')}
        />
        <TouchableOpacity className=" absolute right-5 top-[40%]" onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
      {formType === 'register' && (
        <>
          <ControlledInput
            testID="confirmPassword-input"
            control={control}
            name="confirmPassword"
            label={t('Login.confirmPassword')}
            secureTextEntry={true}
            placeholder={t('Login.confirmPasswordPlaceholder')}
          />
        </>
      )}

      {/* 提交按钮 */}
      <Button
        shape="square"
        label={formType === 'login' ? t('Login.login') : t('Login.register')}
        style={[styles.button, { backgroundColor: formType === 'login' ? '#6c63ff' : '#ff69b4' }]}
        onPress={handleSubmit(data => onSubmit(JSON.stringify(data)))}
      >
      </Button>

    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: 50,
    backgroundColor: '#6c63ff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  formTypeText: {
    color: '#6c63ff',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
})

export default BottomForm
