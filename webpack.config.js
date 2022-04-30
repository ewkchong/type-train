const path = require('path');

module.exports = {
  entry: {
    index: { import: './static/index.js', filename: 'pages[name][ext]' },
    app: { import: './static/app.js', filename: 'pages[name][ext]' }
  }
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};