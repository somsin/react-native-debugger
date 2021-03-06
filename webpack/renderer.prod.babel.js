import webpack from 'webpack';
import BabiliPlugin from 'babili-webpack-plugin';
import baseConfig from './base.babel';

export default {
  ...baseConfig,
  devtool: 'source-map',
  entry: './app/index',
  output: {
    ...baseConfig.output,
    publicPath: 'js/',
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css?$/,
        use: ['style-loader', 'raw-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __REACT_DEVTOOLS_GLOBAL_HOOK__: 'false',
    }),
    new BabiliPlugin({
      comments: false,
    }),
  ],
  resolve: {
    ...baseConfig.resolve,
    aliasFields: ['browser'],
  },
  target: 'electron-renderer',
};
