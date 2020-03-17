const { BeagleViewEnginePlugin } = require('beagle-angular/bin/AOT/webpack-plugin')

module.exports = {
  plugins: [
    new BeagleViewEnginePlugin('src/app/beagle.module.ts'),
  ]
}
