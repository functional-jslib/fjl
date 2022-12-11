const packageJson = require('./package.json');

module.exports = {
  server: {
    command: packageJson.mockServerCommand,
    port: packageJson.mockServerPort,
  },
}
