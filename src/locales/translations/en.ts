import type { Translations } from './zh'

const en: Translations = {
  common: {
    ok: 'OK',
    confirm: 'Confirm',
    cancel: 'Cancel',
    back: 'Back',
    enable: 'Enable',
    disable: 'Disable',
    enabled: 'Enabled',
    disabled: 'Disabled',
    closed: 'Closed',
    opened: 'Opened',
    close: 'Close',
    done: 'Done',
    share: 'Share',
    warning: 'Warning',
  },
  navigation: {
    home: 'Home',
    user: 'User',
  },
  homeScreen: {
    hello: 'Hello!',
  },
  UserScreen: {
    language: 'Language',
    logout: 'Log out',
    logouttext: 'Confirm to log out?',
    about: 'About',
    chinese: 'Chinese',
    english: 'English',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    theme: 'Theme',

  },
  Login: {
    welcome: 'Welcome to use our application!',
    login: 'Login',
    register: 'Register',
    goRegister: 'Don\'t have an account? Go register',
    goLogin: 'Already have an account? Go to login',
    email: 'email',
    emailPlaceholder: 'Please enter your email address',
    password: 'password',
    passwordPlaceholder: 'Please enter your password',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'Please enter your password again',
  },
  permissionManager: {
    camera: 'Camera',
    unavailable: '{{permission}} unavailable',
    blocked:
      'Please go to settings to grant {{permissions}} permission to use this function normally',
    openSettings: 'Open Settings',
  },
}

export default en

export type { Translations }
