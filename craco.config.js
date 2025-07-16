const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      
      return webpackConfig;
    },
  },
  devServer: {
    port: 3000,
    open: true,
  },
};
