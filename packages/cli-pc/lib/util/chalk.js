const chalk = require('chalk')

exports.success = text => chalk.green(`✔${text}`)
exports.error = errMsg => chalk.red(errMsg)
exports.info = info => chalk.blue(info)