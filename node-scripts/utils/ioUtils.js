const
  fs = require('fs'),
  {promisify} = require('util'),

  ioReadDirectory = promisify(fs.readdir),
  ioReadFile = promisify(fs.readFile),
  ioFileAccess = promisify(fs.access),
  ioStat = promisify(fs.stat),
  ioWriteFile = promisify(fs.writeFile),
  ioFileExists = filePath => ioFileAccess(filePath, fs.constants.F_OK),
  canWriteFileIo = filePath => ioFileAccess(filePath, fs.constants.W_OK),
  canReadFileIo = filePath => ioFileAccess(filePath, fs.constants.R_OK),
  canReadAndExistsFileIo = filePath => ioFileAccess(filePath, fs.constants.R_OK),
  canReadAndWriteFileIo = filePath =>
    ioFileAccess(filePath, fs.constants.R_OK | fs.constants.W_OK),
  ioExecuteAndPassThrough = (fn, ...args) => fn(...args)
    .then(() => args, err => { console.log(err); return args; })
;

module.exports = {
  ioReadDirectory,
  ioFileAccess,
  ioReadFile,
  ioWriteFile,
  ioStat,
  canWriteFileIo,
  canReadFileIo,
  canReadAndExistsFileIo,
  canReadAndWriteFileIo,
  ioFileExists,
  ioPassTailThroughAndContinue: ioExecuteAndPassThrough
};
