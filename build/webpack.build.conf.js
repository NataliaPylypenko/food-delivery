const merge = require('webpack-merge') // webpack-merge нужен чтобы разбивать отделять билд и дев разработку
const baseWebpackConfig = require('./webpack.base.conf') // подключаем базовий файл конфига

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: []
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})