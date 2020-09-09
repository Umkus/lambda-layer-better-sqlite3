const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const libName = 'better-sqlite3';
const distPath = `nodejs/node_modules/${libName}`;

module.exports = {
  name: 'layer',
  mode: 'production',
  stats: 'minimal',
  target: 'node',
  watch: false,
  entry: {
    [`${distPath}/index`]: `./node_modules/${libName}/lib/index`,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: `node_modules/${libName}/build`,
          to: `${distPath}/../../build`,
        },
      ],
    }),
    new ZipPlugin({
      filename: `${libName}-layer.zip`,
    })
  ],
  optimization: {
    minimize: false,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  externals: {
    [`../build/Release/${libName}.node`]: `./build/Release/${libName}.node`,
  },
};
