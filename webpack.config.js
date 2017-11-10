/// <binding BeforeBuild='Run - Development' />
var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = ''
var APP_DIR = path.resolve(__dirname, 'src/')

function getPlugins() {
  var plugins = [];
  const api_url = 'http://localhost:65515';
  // api_url = 'http://192.168.2.16:84'
  plugins.push(new webpack.DefinePlugin({ API_HOST: JSON.stringify(api_url) }));
  return plugins;
}

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
  plugins: getPlugins(),
  devtool: 'source-map'
}

module.exports = config
