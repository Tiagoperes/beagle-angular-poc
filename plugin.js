const { readFileSync, unlinkSync, renameSync } = require('fs')
const { execSync } = require('child_process')

class BeagleViewEnginePlugin {
  apply(compiler) {
    const appPath = process.cwd()
    const modulePath = `${appPath}/beagle.module.ts`
    const backupPath = `${appPath}/beagle.module.backup.ts`

    compiler.hooks.entryOption.tap('BeagleViewEnginePlugin.create', () => {
      console.log('Preparing Beagle for ViewEngine project. If the build is cancelled mid-process, you can recover your original code at "src/app/beagle.module.backup.ts".')
      renameSync(modulePath, backupPath)
      execSync('yarn beagle-aot')
    })

    compiler.hooks.done.tap('BeagleViewEnginePlugin.clean', () => {
      try {
        unlinkSync(modulePath)
        renameSync(backupPath, modulePath)
      } catch {
        throw new Error('Beagle: couldn\'t finish the ViewEngine preparation process. In order to recover your original code, rename "src/app/beagle.module.backup.ts" to "src/app/beagle.module.ts".')
      }
    })
  }
}

module.exports = BeagleViewEnginePlugin
