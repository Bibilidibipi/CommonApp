// ./webpack.config.js 
var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/common_app.js",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      }
    ]
  }
};
