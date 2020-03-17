const BeagleViewEnginePlugin = require('./plugin.js')

module.exports = {
  // module: {
  //   rules: [
  //     {
  //       test: /beagle.module.ts$/,
  //       use: [
  //         { loader: './loader.js' },
  //       ]
  //     }
  //   ]
  // }
  plugins: [
    new BeagleViewEnginePlugin(),
  ]
}
