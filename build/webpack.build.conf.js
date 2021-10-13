const merge = require('webpack-merge') // webpack-merge нужен чтобы разбивать отделять билд и дев разработку
const baseWebpackConfig = require('./webpack.base.conf') // подключаем базовий файл конфига

// принимает 2 параметра:
// 1 - константа baseWebpackConfig; 2 - передаем через объект, описываем все что нужно для build
// BUILD config
const buildWebpackConfig = merge(baseWebpackConfig, {
  // если нам нужен --mode production
  mode: 'production',
  // если хотим подключить какие-то плагины
  plugins: []
})

// експортируем нашу настройку
module.exports = new Promise((resolve, reject) => {  // експортируем настройку
  resolve(buildWebpackConfig) // через resolve отправляем buildWebpackConfig
})
// 25.00