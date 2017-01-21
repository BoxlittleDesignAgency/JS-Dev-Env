import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

// let fallback = require("fallback-loader"); var BUILD_DIR =
// path.resolve(__dirname, "src/client/public");
let APP_DIR = path.resolve(__dirname, "src");

export default {
  debug : true,
  devtool : "inline-source-map",
  resolve : {
    extensions: [
      "", ".js", ".jsx", ".css", ".less"
    ],
    modulesDirectories: ["node_modules"]
  },
  noInfo : false,
  entry : path.resolve(__dirname, "src/index"),
  target : "web",
  output : {
    path: path.resolve(__dirname, "src"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins : [
    new webpack.HotModuleReplacementPlugin(),
    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({ template: "src/index.html", inject: true })
  ],
  module : {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader?presets=es2015"]
      }, {
        test: /\.jsx?$/,
        include: APP_DIR,
        exclude: /node_modules/,
        loaders: ["babel-loader?presets=es2015"]
      }, {
        test: /\.css$/,
        loaders: ["style", "css"]
      }, {
        test: /\.(jpe?g|png|gif|woff)$/i,
        loaders: ["file?hash=sha512&digest=hex&name=[hash].[ext]", "image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false"]
      }, {
        test: /\.svg$/,
        loader: "svg-loader?{png:{scale:2}}"
      }
    ]
  }
};
