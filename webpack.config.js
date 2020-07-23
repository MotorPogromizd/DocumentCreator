/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');

const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const format = require('date-fns/format');
const commitHash = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString();
const buildTime = format(new Date(), 'dd.MM.yyyy HH:mm');


const server = {
  name: 'server',
  target: 'node',
  entry: {
    server: './src-server/index.ts',
  },
  externals: [nodeExternals(), 'mongoose'],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(
      {
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true
          },
          mangle: {
            safari10: true
          }
        },
        sourceMap: true,
        cache: true,
        parallel: true,
        extractComments: false
      }
    )],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          // {
          //   loader: 'C:\\Git\\techarms-pi-server-i2c\\node_modules\\cache-loader\\dist\\cjs.js',
          //   options: {
          //     cacheDirectory: 'C:\\Git\\techarms-pi-server-i2c\\node_modules\\.cache\\ts-loader',
          //     cacheIdentifier: '77f2db32'
          //   }
          // },
          // {
          //   loader: 'C:\\Git\\techarms-pi-server-i2c\\node_modules\\thread-loader\\dist\\cjs.js'
          // },
          // {
          //   loader: resolve(__dirname, 'node_modules/babel-loader/lib/index.js')
          // },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              // happyPackMode: true
            }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.ts'],
    plugins: [new TsconfigPathsPlugin()],
    mainFiles: ['index']
  },
  devtool: isProd ? false : 'source-map',
  output: {
    path: resolve(__dirname, 'dist'),
    // publicPath: '/dist/',
    filename: '[name].js',
  },
  plugins: [
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: ['server.js'],
    //   verbose: true,
    //   protectWebpackAssets: false,
    // }),
    new ForkTsCheckerWebpackPlugin({
      tslint: false,
      formatter: 'codeframe',
      checkSyntacticErrors: false,
      reportFiles: ['!**/__tests__/*.ts']
    }),
    new DefinePlugin({
      GIT_COMMIT: JSON.stringify(commitHash),
      BUILD_TIME: JSON.stringify(buildTime),
    })
  ],
};

module.exports = server;
