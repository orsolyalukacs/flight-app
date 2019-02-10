/* Webpack config for eslint import resolving and code assistance in IntelliJ based editors */
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue', '.scss'],
    root: path.resolve(__dirname, 'src'),
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'src')
    }
  }
};
