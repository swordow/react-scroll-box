var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: './src/demo/index.js'
  },
  output: {
    path: './target/demo',
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin( {filename: 'index.html',
      template: 'src/demo/index.html'}),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel'},
      {test: /\.json$/, loader: 'hson'},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less?strictUnits=true&strictMath=true')},
      {test: /\.(png|jpg)$/, loader: 'file-loader?name=[name].[ext]'}
    ]
  }
};
