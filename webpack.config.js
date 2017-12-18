const path = require('path');
const createVendorChunk = require('./webpack-create-vendor-chunk');

module.exports = {
  entry: {
    ui: './src/ui/index.js',
    agent: './src/agent/index.js'
  },

  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, './chrome-extension/build'),
    publicPath: 'build',
    filename: '[name].bundle.js'
  },

  plugins: [
    createVendorChunk({
      name: 'vendor',
      chunks: ['ui']
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /(?:\.woff2?$|\.ttf$|\.svg$|\.eot$)/,
        loader: 'file-loader',
        query: {
          name: '/build/font/[hash].[ext]'
        }
      }
    ]
  }
};
