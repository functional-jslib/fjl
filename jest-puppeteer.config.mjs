import packageJson from './package.json';

export default {
  executablePath: process.env?.PUPPETEER_EXE_PATH, // Browser executable path
  server: {
    command: packageJson.mockServerCommand,
    port: packageJson.mockServerPort,
  },
}
