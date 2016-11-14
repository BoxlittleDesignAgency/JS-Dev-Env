import path from 'path';

//var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
let APP_DIR = path.resolve(__dirname, 'src/client/app');

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.jsx?/, include: APP_DIR , loaders:['babel'] },
      { test: /\.css$/, loaders: ['style','css'] }
    ]
  }
}
