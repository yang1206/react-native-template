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

const babelConfig = vanillaConfig

module.exports = babelConfig
