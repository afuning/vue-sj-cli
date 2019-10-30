const execa = require('execa')

exports.executeCommand = function executeCommand (command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = execa(command, args, {
      cwd
    })
    child.on('close', code => {
      if (code !== 0) {
        reject(`command failed: ${command} ${args.join(' ')}`)
        return
      }
      resolve()
    })
  })
}