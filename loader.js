const { readFileSync, unlinkSync } = require('fs')
const { execSync } = require('child_process')

function myLoader(content) {
  console.log('INSIDE LOADER')
  execSync('yarn beagle-aot')
  console.log('finished')
  const generatedCode = readFileSync('./dist/.beagle.codegen.ts', { encoding: 'UTF-8' })
  // try {
  //   unlinkSync('./dist/.beagle.codegen.ts')
  // } catch {}
  return generatedCode
}

module.exports = myLoader
