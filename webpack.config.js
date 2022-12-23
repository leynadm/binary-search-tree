const path = require('path');

module.exports = {
  entry: './src/script.js',
  mode: 'development',
  watch: true,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
