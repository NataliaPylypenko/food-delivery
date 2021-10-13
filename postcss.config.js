module.exports = {
  plugins: [
    require('autoprefixer'), // добавляет автопрефиксы
    require('css-mqpacker'), // групирует все медиа запросы
    require('cssnano')({  // удаляет комментарии для продакшн
      preset: [
        'default', {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
};
