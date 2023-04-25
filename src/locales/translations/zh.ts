const zh = {
  common: {
    ok: '好',
    confirm: '确认',
    cancel: '取消',
    back: '返回',
    enable: '启动',
    disable: '禁用',
    enabled: '已启动',
    disabled: '已禁用',
    closed: '已关闭',
    opened: '已打开',
    close: '关闭',
    done: '完成',
    share: '分享',
    warning: '警告',
  },
  navigation: {
    home: '首页',
    user: '个人中心',
  },
  homeScreen: {
    hello: '你好！',
  },
  UserScreen: {
    language: '语言',
    logout: '退出登录',
    about: '关于',
    logouttext: '确认要退出吗？',
    chinese: '中文',
    english: 'English',
    light: '浅色模式',
    dark: '深色模式',
    system: '跟随系统',
    theme: '主题',
  },
  Login: {
    welcome: '欢迎使用我们的应用！',
    login: '登录',
    register: '注册',
    goRegister: '没有账户？去注册',
    goLogin: '已有账户？去登录',
    email: '邮箱',
    emailPlaceholder: '请输入邮箱',
    passwordPlaceholder: '请输入密码',
    password: '密码',
    confirmPassword: '确认密码',
    confirmPasswordPlaceholder: '请再次输入密码',
  },
  permissionManager: {
    camera: '相机',
    unavailable: '{{permission}}功能不可用',
    blocked: '请前往设置授予{{permissions}}权限，才能正常使用该功能',
    openSettings: '打开设置',
  },
}

export default zh

export type Translations = typeof zh
