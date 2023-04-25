import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { useThemeStore } from '@/hooks'

function About() {
  const { colorScheme } = useThemeStore()

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colorScheme === 'dark' ? '#1A202C' : '#FFFFFF' },
      ]}>
      <View style={styles.content}>
        <Icon
          name="logo-react"
          size={100}
          color={colorScheme === 'dark' ? '#FFFFFF' : '#1A202C'}
        />
        <Text
          style={[
            styles.title,
            { color: colorScheme === 'dark' ? '#FFFFFF' : '#1A202C' },
          ]}>
          React Native Template
        </Text>
        <Text
          style={[
            styles.description,
            { color: colorScheme === 'dark' ? '#A0AEC0' : '#718096' },
          ]}>
          A sleek, highly customizable React Native template, utilizing popular
          technologies such as TypeScript and Tailwind CSS, suitable for
          building high-quality mobile applications.
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
})

export default About
