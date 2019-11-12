const fs = require('fs')
const path = require('path')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const {
  success,
  error,
  info
} = require('./util/chalk')
const {
  logWithSpinner,
  stopSpinner,
  failSpinner
} = require('./util/spinner')

const TEMPLATE_URL = new Map([
  ['table', './template/table.js']
])

async function add (name) {
  const cwd = process.cwd()
  // 目标文件
  const targetDir = path.resolve(cwd, name)
  if (fs.existsSync(targetDir)) {
    throw new Error(`\n${error(targetDir)}存在相同文件...`)
  }
  const { type } = await inquirer.prompt([
    {
      name: 'type',
      type: 'list',
      message: `目标文件：${info(targetDir)} 。请选择类型:`,
      choices: [
        { name: '基础分页表格筛选', value: 'table' }
      ]
    }
  ])
  const tempUrl = TEMPLATE_URL.get(type)
  logWithSpinner(`🗃`, `${type}:Initializing git repository[${chalk.cyan(gitUrl)}]...`)
}

module.exports = (...args) => {
  return add(...args).catch(err => {
    console.log(err.message)
    process.exit(1)
  })
}