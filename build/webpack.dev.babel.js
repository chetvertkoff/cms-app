import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import common from './webpack.common.babel'
import express from 'express'

const devWebpackConfig = merge(common, {
  // DEV config
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: [path.join(__dirname, '../uploads'), common.externals.paths.dist],
    contentBasePublicPath: `${common.externals.paths.dist}/assets/`,
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: { "/api/**": { target: 'http://localhost:5000', secure: false }  },
    setup (app) {
      app.use('/upload/',
        express.static(path.join(__dirname, '../uploads')));
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