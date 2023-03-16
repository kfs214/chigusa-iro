const path = require('path');
const GasPlugin = require('gas-webpack-plugin');

module.exports = {
  entry: { bundle: './src/index.ts' },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: { extensions: ['.ts', '.js'] },
  devServer: {
    static: { directory: path.join(__dirname, 'main') },
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
  mode: 'development',
  plugins: [new GasPlugin()],
};
