const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const Creator = require('./Creator')

async function create (name) {
  const cwd = process.cwd()
  // 目标文件
  const targetDir = path.resolve(cwd, name)
  console.log('targetDir: ', targetDir)
  if (fs.existsSync(targetDir)) {
    throw new Error(`\n${chalk.cyan(targetDir)}存在相同文件...`)
  }

  const creator = new Creator(name, targetDir)
  await creator.create()
}

module.exports = (...args) => {
  console.log('args: ', args)
  return create(...args).catch(err => {
    console.log(err.message)
    process.exit(1)
  })
}