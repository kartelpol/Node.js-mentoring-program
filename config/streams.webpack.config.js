const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const ENTRY_PATH = path.join(__dirname, '../src/utils/streams/index.js');
const BUILD_PATH = path.join(__dirname, '../build');
const PROJECT_ROOT = path.join(__dirname, '../');

const clean = new CleanWebpackPlugin(['build/streams.bundle.js'], {
    root: PROJECT_ROOT,
});

module.exports = (env, argv) => ({
    entry: ENTRY_PATH,
    output: {
      path: BUILD_PATH,
      filename: 'streams.bundle.js'
    },
    
    target: 'node',
    resolve: {
      extensions: ['.js', '.json'],
    },
    plugins: [clean],
  });
  