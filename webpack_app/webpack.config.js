const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: false,
    }),
  ],
};
