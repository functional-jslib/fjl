const
  fs = require('fs'),
  os = require('os'),
  child_process = require('child_process'),
  {exec, spawn} = child_process,
  {log, warn} = console,

  npmCmd = os.platform().indexOf('win') === 0 ? 'npm.cmd' : 'npm',

  ioExec = (cmd, options) => new Promise((resolve, reject) => {
    const p = exec(cmd, options, (err, stdout, stderr) => {
      if (err) reject(err);
      resolve(stdout, stderr);
    });
    p.stdout.on('data', console.log);
    p.stderr.on('data', console.warn);
  }),

  ioSpawn = (cmd, args, options) => new Promise((resolve, reject) => {
    const p = spawn(cmd, args, options);
    let exited = false;

    p.stdout.on('data', data => log(data.toString('utf8')));
    p.stderr.on('data', data => warn(data.toString('utf8')));

    p.on('error', err => {
      exited = true;
      reject(err);
    });

    p.on('exit', (code, signal) => {
      if (code) reject(`Spawned process exited with code ${code}.`);
      if (signal) reject(`Spawned process exited with signal: ${signal}`);
      if (!exited) resolve();
      exited = true;
    });

    p.on('close', code => {
      if (code) reject(`Spawned process exited with code ${code}.`);
      if (!exited) resolve();
    });
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
  ioPassTailThroughAndContinue: ioExecuteAndPassThrough,
  ioSpawn,
  npmCmd
};
