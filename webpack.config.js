const path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    static: {
        directory: path.join(__dirname, '.'),
    },
    port: 8080,
  },
  module: {
    rules: [
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
      ],
  }
};
