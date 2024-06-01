import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  // args: ['--disable-setuid-sandbox', '--no-sandbox'],
  headless: true,
  cacheDirectory: path.join(path.resolve(__dirname), './.cache')
};
