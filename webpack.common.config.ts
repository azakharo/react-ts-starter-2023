import path from 'path';
import {Configuration} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import {imagesDir, entry} from './build-constants';

const config: Configuration = {
  entry,
  output: {
    hashFunction: 'xxhash64',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, 'src'),
      IMAGES: imagesDir,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: path.join(imagesDir, 'favicon.ico'),
    }),
    new ForkTsCheckerWebpackPlugin({
      // blocks the compilation if any errors exist
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      fix: true,
    }),
  ],
};

export default config;
