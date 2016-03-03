var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    index: './src/test/index.js'
  },
  output: {
    path: './target/out'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/test/index.html',
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
