import path from 'path';
import webpack from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import webpackMd5Hash from 'webpack-md5-hash';
import extractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor : path.resolve(__dirname, 'src/vendor'),
    main : path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //Generate an external CSS file with a hash im a filename
    new extractTextPlugin('[name].[contenthash].css'),
    //Hash the files using MD5 so the file changes when the content changes
    new webpackMd5Hash(),
    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so tht they are cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    //Create html file that includes bundle.js
    new htmlWebpackPlugin({
      template:'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      trackJSToken:'4dd03c1dd752461eba97ef82fd0158ae'
    }),
    //Eliminate dublicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    //Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: extractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
