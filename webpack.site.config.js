var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    index: './src/site/index.js'
  },
  output: {
    path: './target/out',
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/site/index.html',
      minify: {collapseWhitespace: true}
    }),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel'},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less?strictUnits=true&strictMath=true')}
    ]
  }
};
