const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  swcMinify: false, // 禁用 SWC 压缩，启用 Terser
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      config.optimization.minimize = true;
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            mangle: {
              reserved: ['tronWeb'] // 保留变量名不被混淆
            }
          }
        })
      ];
    }
    return config;
  }
};
