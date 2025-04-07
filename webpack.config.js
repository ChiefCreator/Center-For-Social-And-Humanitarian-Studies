export const config = {
  mode: 'production',
  entry: {
    index: "./src/js/index.js"
  },
  output: {
  	filename: '[name].bundle.js',
  },
  externalsType: 'script',
  externals: {
    ymaps3: ['https://api-maps.yandex.ru/v3/?apikey=f7f840cb-ea83-44e7-ad13-40eafe0e6237&lang=ru_RU', 'ymaps3']
  },
  devtool: 'cheap-source-map',
  module: {
  	rules: [
  	  {
  	  	test: /\.css$/,
  	  	use: ['style-loader', 'css-loader'],
  	  },
  	],
  },
};
