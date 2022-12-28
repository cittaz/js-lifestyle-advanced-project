const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/js/index.js',
    getData: './src/js/getData.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'JS Advanced Project',
      template: './src/file.html',
      minify: false,
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  
  module: {
    rules: [
      {
      test: /\.html$/i,
      loader: "html-loader",
      options: {
        minimize: false,
      }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },

    ],
  },
};