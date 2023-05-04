module.exports = {
  dependencies: {
    // ...{ 'react-native-flipper': { platforms: { ios: null } } },
    ...(process.env.NO_FLIPPER ? { 'react-native-flipper': { platforms: { ios: null } } } : {}),
  },
}
