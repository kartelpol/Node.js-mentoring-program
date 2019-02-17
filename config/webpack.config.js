const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const ENTRY_PATH = path.join(__dirname, '../src/app.js');
const BUILD_PATH = path.join(__dirname, '../build');
const PROJECT_ROOT = path.join(__dirname, '../');

const SRC_PATH = path.resolve(__dirname, '../src');
const MODELS_PATH = path.resolve(__dirname, '../src/models');

const clean = new CleanWebpackPlugin(['build/bundle.js'], {
    root: PROJECT_ROOT,
});

module.exports = (env, argv) => ({
    entry: ENTRY_PATH,
    output: {
      path: BUILD_PATH,
      filename: 'bundle.js'
    },
    
    target: 'node',
    externals: [ nodeExternals() ],
    resolve: {
      extensions: [ '.js', '.json' ],
      alias: {
        src: SRC_PATH,
        models: MODELS_PATH,
      }
    },

    watch: argv.mode === 'development',
    
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },

    plugins: [
        clean,
        new WebpackShellPlugin({
           onBuildEnd:  argv.mode === 'development' && 
           [`nodemon build/bundle.js --watch`]
      })
    ],
  });
  