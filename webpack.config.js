/// <binding BeforeBuild='Run - Development' />
var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = ''
var APP_DIR = path.resolve(__dirname, 'src/')

var config = {
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      }
    ]
  },
  entry: APP_DIR + '/Main/app.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devtool: 'source-map'
}

module.exports = config
