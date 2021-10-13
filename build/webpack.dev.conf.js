const webpack =  require('webpack')
const merge = require('webpack-merge') // webpack-merge нужен чтобы разбивать отделять билд и дев разработку
const baseWebpackConfig = require('./webpack.base.conf')

// DEV config
const devWebpackConfig = merge(baseWebpackConfig, {
  // если нам нужен --mode development
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // получаем доступ к глобальным константам
    // берем базовый файл конфигурации baseWebpackConfig,
    // к нему приписываем .externals
    // + ярлык и какой именно paths будем считывать .paths.dist
    contentBase: baseWebpackConfig.externals.paths.dist, // отвечает за то где открывается Webpack
    port: 8081,
    overlay: { // для вывода ошибок
      warnings: true,
      errors: true
    }
  },
  plugins: [
    // для максимально корректной работы карты сайта. нужна только в DEV
    // в scss увидим вложенные файлы которые подключаем через @import
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
