// подключаем path отдельным модулем, а не используем встроенный в node.js
const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Разделяем конфиги в package.json: 1. Merge; 2. ENV;

// Main const
// с такой структурой можно будет изменить название путей и автоматически поменяются названия папок
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'), // здесь можем поменять название папки
  assets: 'assets/' // и здесь
}

// Pages const for HtmlWebpackPlugin
// const PAGES_DIR = PATHS.src
const PAGES_DIR = PATHS.src
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'))

module.exports = {
  // для получения константы PATHS из других конфигов
  externals: {
    // как называем: что именно
    paths: PATHS
  },
  // точка входа
  entry: {
    // module: `${PATHS.src}/your-module.js`,
    app: PATHS.src, // путь к входному файлу js
  },
  // точка выхода
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`, //текущий name ссылается на ярлык app, вместо name подставляется app
    path: PATHS.dist,
    /*
      publicPath: '/' - relative path for dist folder (js,css etc)
      publicPath: './' (dot before /) - absolute path for dist folder (js,css etc)
    */
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/, // берем все .js файлы
        loader: 'babel-loader', //обрабатываем babel-loader
        exclude: '/node_modules/' // кроме node_modules
      },
      // Fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      // images / icons
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]' // разширение .ext берется з test
        }
      },
      // обрабатываем .scss файлы
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: `./postcss.config.js` } }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      // обрабатываем .css файлы
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: `./postcss.config.js` } }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '~': PATHS.src, // Example: import Dog from "~/assets/img/dog.jpg"
      '@': `${PATHS.src}/js` // Example: import Sort from "@/utils/sort.js"
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),

    new CopyWebpackPlugin([
      // копируем откуда и куда
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
      { from: `${PATHS.src}/static`, to: '' }, // файли из src/static должны попадать в dist и храниться в корне проекта
    ]),

    // Automatic creation any html pages (Don't forget to RERUN dev server!)
    ...PAGES.map(
      page =>
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/${page}`,
        filename: `./${page}`
      })
    )
  ]
}
