const PACKAGE_MANAGER_CONFIG = {
  npm: {
    install: ['install', '--loglevel', 'error'],
    add: ['install', '--loglevel', 'error'],
    upgrade: ['update', '--loglevel', 'error'],
    remove: ['uninstall', '--loglevel', 'error']
  }
}

class PackageManager {
  constructor ({ context } = {}) {
    this.context = context
    this.bin = 'npm'
  }

  async install () {
    return executeCommand(this.bin, PACKAGE_MANAGER_CONFIG[this.bin].install, this.context)
  }
}

module.exports = PackageManager