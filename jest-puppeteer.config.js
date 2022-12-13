const packageJson = require('./package.json');

module.exports = {
  executablePath: process.env?.PUPPETEER_EXE_PATH, // Browser executable path
  server: {
    command: packageJson.mockServerCommand,
    port: packageJson.mockServerPort,
  },
}
