var path = require("path");
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(env) {

  var pack = require("./package.json");
  var ExtractTextPlugin = require("extract-text-webpack-plugin");
  var production = !!(env && env.production === "true");
  var babelSettings = {
    extends: path.join(__dirname, '/.babelrc')
  };

  var config = {
    entry: "./sources/myapp.js",
    output: {
      path: path.join(__dirname, 'target', 'dist'),
      publicPath: "/",
      filename: "myapp.js"
    },
    devtool: "inline-source-map",
    devServer: {
      host: '0.0.0.0',
      port: 8080
    },
    module: {
      rules: [{
          test: /\.js$/,
          loader: "babel-loader?" + JSON.stringify(babelSettings)
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          loader: "url-loader?limit=25000"
        },
        {
          test: /\.(less|css)$/,
          loader: ExtractTextPlugin.extract("css-loader!less-loader")
        }
      ]
    },
    resolve: {
      extensions: [".js"],
      modules: ["./sources", "node_modules"],
      alias: {
        "jet-views": path.resolve(__dirname, "sources/views"),
        "jet-locales": path.resolve(__dirname, "sources/locales")
      }
    },
    plugins: [
      new ExtractTextPlugin("./myapp.css"),
      new webpack.DefinePlugin({
        VERSION: `"${pack.version}"`,
        APPNAME: `"${pack.name}"`,
        PRODUCTION: production
      }),
      new CopyWebpackPlugin([
        { from: 'images', to: 'images' },
        { from: 'libs', to: 'libs' },
        { from: 'index.html', to: 'index.html' }
      ])
    ]
  };

  if (production) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        test: /\.js$/
      })
    );
  }

  return config;
}
