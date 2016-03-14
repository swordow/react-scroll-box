var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: './src/main/index.js'
  },
  output: {
    path: './target/out',
    filename: '[name].js',
    library: 'ScrollBox',
    libraryTarget: 'umd'
  },
  externals: [
    {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  ],
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel'},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less?strictUnits=true&strictMath=true')}
    ]
  }
};
