const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  target: 'web',
  entry: [
    'file-loader?name=index.html!./src/gh-pages/index.html',
    './src/gh-pages/index.less',
    './src/gh-pages/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './target/gh-pages'),
    filename: 'index.js'
  },
  plugins: [
    new ExtractTextPlugin({filename: 'index.css'})
  ],
  module: {
    rules: [
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
      {test: /\.json$/, use: 'hson-loader'},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('css-loader!less-loader')}
    ]
  }
};
