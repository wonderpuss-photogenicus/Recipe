const path = require('path');

module.exports = {
  entry: {
    app: ["regenerator-runtime/runtime.js", "./client/index.js"],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
    },
    proxy: { '/': 'http://localhost:3000' },
    compress: true,
    port: 8080,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
