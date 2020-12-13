const
  fs = require('fs'),
  child_process = require('child_process'),
  {exec} = child_process,

  ioExec = (cmd, options) => new Promise((resolve, reject) => {
    const p = exec(cmd, options, (err, stdout, stderr) => {
      if (err) reject(err);
      resolve(stdout, stderr);
    });
    p.stdout.on('data', console.log);
    p.stderr.on('data', console.warn);
  }),

  ioFileExists = filePath => fs.promises.access(filePath, fs.constants.F_OK),
  canWriteFileIo = filePath => fs.promises.access(filePath, fs.constants.W_OK),
  canReadFileIo = filePath => fs.promises.access(filePath, fs.constants.R_OK),
  canReadAndExistsFileIo = filePath => fs.promises.access(filePath, fs.constants.R_OK),
  canReadAndWriteFileIo = filePath => fs.promises.access(filePath, fs.constants.R_OK | fs.constants.W_OK),
  ioExecuteAndPassThrough = (fn, ...args) => fn(...args)
    .then(() => args, err => {
      console.log(err);
      return args;
    })
;

module.exports = {
  ioExec,
  ioFileExists,
  canWriteFileIo,
  canReadFileIo,
  canReadAndExistsFileIo,
  canReadAndWriteFileIo,
  ioPassTailThroughAndContinue: ioExecuteAndPassThrough
};
