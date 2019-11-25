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
const {
  logWithExit,
  clearConsole
} = require('./util/log')
const { 
  createFile
} = require('./util/fileApi')

const log = console.log
const TEMPLATE_URL = new Map([
  ['table', './template/table.vue']
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
  const tempUrl = path.resolve(__dirname, TEMPLATE_URL.get(type))
  await clearConsole()
  logWithSpinner(`🗃`, `${type}:Initializing template repository[${info(tempUrl)}]...`)
  await createFile(tempUrl, {
    fileName: name,
    exportPath: cwd
  })
  stopSpinner()
  logWithExit(`${success('生成成功')}`)
}

module.exports = (...args) => {
  return add(...args).catch(err => {
    console.log(err.message)
    process.exit(1)
  })
}