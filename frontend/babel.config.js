rules: [{
    test: /\.js$/,
    use: 'babel-loader',
    exclude: '/node_modules/'
  },
  // добавили правило для обработки файлов
  {
    // регулярное выражение, которое ищет все файлы с такими расширениями
    test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
    type: 'asset/resource'
  },
]