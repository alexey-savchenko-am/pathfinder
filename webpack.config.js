const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./main.js', './index.html'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '.'),
    },
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  optimization: {
    minimize: true, 
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, 
          },
          compress: {
            drop_console: true, 
          },
        },
        extractComments: false,
      }),
    ],
  },
};
