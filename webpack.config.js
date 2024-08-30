const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //плагін створює html файл і автоматично додає туди стилі і скрипки
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // плагін очищає папку dist перед кожною наступною збіркою
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//плагін витягує стилі зі скриптів і створює в папці діст оеремі файли стилів
const CopyWebpackPlugin = require('copy-webpack-plugin'); // плагін переносить css файли абр папки з src в папку збірки, не змінюючи його (потрібен для resrt,css)

module.exports = {
  entry: './src/index.js',// цей файл додається, щоб в подільшому можна було легко розширювати проект і додавати туди скріпти, або використовувати css фреймфорки чи бібліотеки, дозволяє автоматизувати рутинні задачі - додавання префіксів, мінімізація css і т п. В моєму конкрутньому випадку файл допомагає плагіну HtmlWebpackPlugin автоматично додавати посилання на згенеровані файли (наприклад, CSS і JS) у мій HTML-документ. Файл index.js допомагає забезпечити цю інтеграцію.
  output: {
    filename: 'bundle.js',// bundle.js забезпечує правильне завантаження та виконання всіх залежностей у правильному порядку. Це особливо корисно для великих проектів з багатьма залежностями,  містить весь ваш JavaScript-код, об’єднаний в один файл. Це включає всі імпортовані модулі та залежності, що дозволяє браузеру завантажувати весь необхідний код за один HTTP-запит.
    path: path.resolve(__dirname, 'dist'), //Вказує на шлях до вихідного каталогу, куди Webpack буде зберігати згенеровані файли.
    publicPath: '/',//Вказує на базовий шлях для всіх ресурсів у моєму проекті. У цьому випадку це коренева директорія
  },
  module: {
    rules: [ //rules - це Масив правил для обробки різних типів файлів
      {
        test: /\.scss$/, //test - Вказує на тип файлів, які потрібно обробляти
        use: [ // use -  Масив лоадерів, які будуть застосовані до файлів, що відповідають test
          MiniCssExtractPlugin.loader,// Витягує CSS у окремі файли
          'css-loader', // css-loader - Обробляє CSS-файли
          'sass-loader', //sass-loader Компілює SCSS у CSS.
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // type: Вказує на тип ресурсу (наприклад, asset/resource для зображень).
        generator: { // generator: Налаштування для генерації файлів (наприклад, збереження зображень у папці dist/images).
          filename: 'images/[name][ext]', // Зберігаємо зображення у папці dist/images
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images', to: 'images' }, // Копіюємо папку зображень
        { from: 'src/css/reset.css', to: 'css/reset.css' }, // Копіюємо reset.css
      ],
    }),
  ],
  devServer: { // це налаштування devServer
    static: {//static: Вказує на каталог, з якого сервер буде обслуговувати статичні файли.
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,//compress: Вмикає стиснення gzip для покращення продуктивності.
    port: 9000,//port: Вказує порт, на якому буде працювати сервер (9000).
    open: true,//open: Автоматично відкриває браузер після запуску сервера.
    hot: true,//hot: Вмикає гаряче перезавантаження модулів (HMR) для оновлення змін без перезавантаження сторінки.HMR підтримує оновлення стилів, JavaScript-коду та навіть деяких інших ресурсів. Це робить вебпак схожим на vite
    devMiddleware: {//devMiddleware: Додаткові налаштування для проміжного програмного забезпечення.
      writeToDisk: true,//writeToDisk: Дозволяє записувати файли на диск.
    },
  },
  mode: 'development',//mode: Вказує режим збірки (наприклад, development для розробки або production для продакшн).
};
