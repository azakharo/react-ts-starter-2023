import webpack from "webpack";
import merge from "webpack-merge";

import {outDir} from './build-constants';
import commonConfig from './webpack.common.config';

const prodSpecificConfig: webpack.Configuration = {
  mode: "production",
  output: {
    path: outDir,
    filename: "[name].[contenthash].js",
    publicPath: "",
    clean: true,
  },
};

const config: webpack.Configuration = merge(commonConfig, prodSpecificConfig);

export default config;
