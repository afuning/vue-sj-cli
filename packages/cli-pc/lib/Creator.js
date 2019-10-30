const execa = require('execa')
const writeFileTree = require('./util/writeFileTree')
const PackageManager = require('./util/ProjectPackageManager')
const {
  logWithSpinner,
  stopSpinner
} = require('./util/spinner')

module.exports = class Creator {
  constructor (name, context) {
    this.name = name
    this.context = context

    this.run = this.run.bind(this)
  }

  async create () {
    const { name, context, run } = this
    const pm = new PackageManager({ context })
    // 生成package
    const pkg = {
      name,
      version: '0.1.0',
      private: true,
      devDependencies: {}
    }
    // write package.json
    await writeFileTree(context, {
      'package.json': JSON.stringify(pkg, null, 2)
    })
    // git init
    logWithSpinner(`🗃`, `Initializing git repository...`)
    await run('git init')
    stopSpinner()

    // npm install
    log(`⚙  Installing CLI plugins. This might take a while...`)
    log()
    await pm.install()
    
  }

  run (command, args) {
    if (!args) { [command, ...args] = command.split(/\s+/) }
    return execa(command, args, { cwd: this.context })
  }

}