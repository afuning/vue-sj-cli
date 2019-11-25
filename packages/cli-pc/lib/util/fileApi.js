const fs = require('fs')
const writeFileTree = require('./writeFileTree')

/**
 * 读取文件
 *
 * @param {*} path
 * @returns
 */
exports.readFile = (path) => {
  const template = fs.readFileSync(path, 'utf-8')
  return template
}

/**
 * 解析文件
 *
 * @param {*} template
 * @param {*} options
 * @returns
 */
exports.formatTemplate = (template, options) => {
  return template
}

/**
 * 渲染文件
 *
 * @param {*} template
 * @param {*} { exportPath, fileName }
 */
exports.renderTemplate = (template, { exportPath, fileName }) => {
  const files = {
    [fileName]: template
  }
  writeFileTree(exportPath, files)
}

exports.createFile = (url, {
  fileName,
  exportPath
}) => {
  return new Promise((resolve, reject) => {
    let t = exports.readFile(url)
    t = exports.formatTemplate(t)
    exports.renderTemplate(t, {
      fileName,
      exportPath
    })
    resolve()
  })
}
