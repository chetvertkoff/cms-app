import webpack from 'webpack'
import merge from 'webpack-merge'
import common from './webpack.common.babel'

const devWebpackConfig = merge(common, {
  // DEV config
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: common.externals.paths.dist,
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    }
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
