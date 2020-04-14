import merge from 'webpack-merge'
import common from './webpack.common.babel'

const buildWebpackConfig = merge(common, {
  // BUILD config
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
}
})

export default new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
