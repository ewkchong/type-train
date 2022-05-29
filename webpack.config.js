
const path = require('path');

module.exports = {
  entry: {
    index: { import: './static/index.js', filename: 'pages/[name].js' },
    app: { import: './static/app.js', filename: 'pages/[name].js' }
  },
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  watch: true,
};