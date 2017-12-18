const webpack = require('webpack');
const path = require('path');
const cwd = process.cwd();

function isVendorPath(modulePath) {
  return [
    path.resolve(cwd, 'node_modules'),
    path.resolve(cwd, 'vendor')
  ].some((path) => modulePath.indexOf(path) === 0);
}

function shouldVendor(module) {
  // non-js output isn't vendored because this could potentially interfere with ExtractTextPlugin
  return module.resource && /\.js$/.test(module.resource) && isVendorPath(module.resource);
}

function createVendorChunk(options = {}) {
  return new webpack.optimize.CommonsChunkPlugin({
    name: options.name || 'vendor',
    chunks: options.chunks,
    minChunks: shouldVendor
  });
}

module.exports = createVendorChunk;
