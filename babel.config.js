const plugins = [
  [
    'module-resolver',
    {
      extensions: [
        '.ios.ts',
        '.android.ts',
        '.ts',
        '.ios.tsx',
        '.android.tsx',
        '.tsx',
        '.jsx',
        '.js',
        '.json',
      ],
      alias: {
        '@': './src',
      },
    },
  ],
  ['nativewind/babel',
    { mode: 'compileOnly' },
  ],
  'react-native-reanimated/plugin',
]

const vanillaConfig = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {},
  },
  plugins,
}

const expoConfig = {
  presets: ['babel-preset-expo'],
  env: {
    production: {},
  },
  plugins,
}

let isExpo = false
try {
  const Constants = require('expo-constants')
  // True if the app is running in an `expo build` app or if it's running in Expo Go.
  isExpo
    = Constants.executionEnvironment === 'standalone'
    || Constants.executionEnvironment === 'storeClient'
}
catch { }

const babelConfig = isExpo ? expoConfig : vanillaConfig

module.exports = babelConfig
