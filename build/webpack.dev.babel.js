import webpack from 'webpack'
import merge from 'webpack-merge'
import common from './webpack.common.babel'
import path from 'path'

const devWebpackConfig = merge(common, {
  // DEV config
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    writeToDisk: true,
    historyApiFallback: true,
    contentBase: './public',
    publicPath: "/assets/",
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: { "/api/**": { target: 'http://localhost:5000', secure: false }  }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
})

export default new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})