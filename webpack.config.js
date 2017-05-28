const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  target: 'web',
  entry: [
    './src/main/index.less',
    './src/main/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './target/out'),
    filename: 'index.js'
  },
  plugins: [
    new ExtractTextPlugin({filename: 'index.css'})
  ],
  module: {
    rules: [
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
      {test: /\.less/, loader: ExtractTextPlugin.extract('css-loader!less-loader')}
    ]
  }
};
