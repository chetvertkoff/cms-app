import path from 'path'
import glob from 'glob'
import {CleanWebpackPlugin}  from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
// import PurgecssPlugin from 'purgecss-webpack-plugin'

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../public'),
  assets: 'assets/'
}

export default {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src,
    // module: `${PATHS.src}/your-module.js`,
  },
  devtool: 'inline-source-map',
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/',
    sourceMapFilename: 'bundle.map'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // filename: 'assets/js/vendor.js',
          name:'vendor',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },{
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: false, config: { path: `./build/postcss.config.js` } }
        }
      ]
    },
    {
      test: /\.(svg|png|gif|jpg)$/,
      exclude: /fonts/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.(ttf|eot|woff|svg|woff2)$/,
      use: {
        loader: "file-loader",
        options: {
          name: `[name].[ext]`,
        }
      }
    }]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    new ManifestPlugin(),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/Admin/static/css/fonts/`, to: `${PATHS.assets}css/fonts` },
    ]),
    // new PurgecssPlugin({
    //   paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,  { nodir: true }),
    // }),
    // new ImageminPlugin({
    //   pngquant: ({quality: 50}),
    //   plugins: [imageminMozjpeg({quality: 50})]
    // })
  ],
}
