var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
  entry: "./public/main.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "output.js"
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style!css"
    },{
      test: /\.js$/,
      loader: "null"
    }]
  },
  resolve: {
    extensions:["", ".js", ".css"]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        filename: path.join(__dirname, 'dist', 'index.html')
    })
  ]
};
