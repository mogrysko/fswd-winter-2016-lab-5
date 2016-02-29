module.exports = {
  cache: true,
  entry: './js/index',
  output: {
    path: __dirname + '/public',
    filename: 'browser-bundle.js'
  },
  module: {
    loaders: []
  }
};
