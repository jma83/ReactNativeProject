const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: [__dirname],
        alias: {
          '@app': __dirname,
          '@src': path.join(__dirname, 'src'),
          '@application': path.join(__dirname, 'src', 'application'),
          '@components': path.join(__dirname, 'src', 'components'),
          '@screens': path.join(__dirname, 'src', 'screens'),
          '@utils': path.join(__dirname, 'src', 'utils'),
          '@assets': path.join(__dirname, 'assets')
        }
      }
    ]
  ]
};
