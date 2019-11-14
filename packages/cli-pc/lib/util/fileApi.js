const writeFileTree = require('./writeFileTree')

/**
 * 读取文件
 *
 * @param {*} path
 * @returns
 */
exports.readFile = (path) => {
  const finalTemplate = fs.readFileSync(path, 'utf-8')
  return finalTemplate
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
    [fileName]: exportPath
  }
  writeFileTree(exportPath, files)
}
