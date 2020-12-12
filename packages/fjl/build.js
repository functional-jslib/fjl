const path = require('path'),
  del = require('del'),
  {execAsIo} = require('../../node-scripts/utils'),
  distPath = path.join(__dirname, 'dist');

(async () => await del(distPath)
  .then(files => {
    if (files && files.length)
      console.log(`Files cleaned:\n${files.join(',\n')}\n`);
    else console.log('No files to clean.');
  })
  .then(() =>
    execAsIo('npm run build:all', [], {cwd: __dirname})).catch(console.error))()
