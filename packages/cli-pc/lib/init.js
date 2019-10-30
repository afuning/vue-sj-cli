const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const {
  logWithSpinner,
  stopSpinner,
  failSpinner
} = require('./util/spinner')

const GITHUB_URL = new Map([
  ['pc', 'https://github.com/afuning/vue-pc-init.git']
])

async function init (name) {
  const cwd = process.cwd()
  // 目标文件
  const targetDir = path.resolve(cwd, name)
  if (fs.existsSync(targetDir)) {
    throw new Error(`\n${chalk.cyan(targetDir)}存在相同文件...`)
  }
  const { type } = await inquirer.prompt([
    {
      name: 'type',
      type: 'list',
      message: `目标文件：${chalk.cyan(targetDir)} 。请选择类型:`,
      choices: [
        { name: 'PC端', value: 'pc' }
      ]
    }
  ])
  const gitUrl = GITHUB_URL.get(type)
  logWithSpinner(`🗃`, `${type}:Initializing git repository[${chalk.cyan(gitUrl)}]...`)
  download (
    `direct:${gitUrl}`,
    targetDir,
    { clone: true },
    err => {
      if (err) {
        failSpinner(err.statusCode)
        throw Error(err.statusCode)
      }
  
      stopSpinner()
      console.log(chalk.green('\n 初始化完成!'))
      process.exit(0)
    }
  )
}

module.exports = (...args) => {
  return init(...args).catch(err => {
    console.log(err.message)
    process.exit(1)
  })
}