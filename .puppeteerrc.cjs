const path = require('path');

module.exports = {
  // args: ['--disable-setuid-sandbox', '--no-sandbox'],
  headless: true,
  cacheDirectory: path.join(path.resolve(__dirname), './.cache')
};
