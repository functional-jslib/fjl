const fs = require('fs'),
    del = require('del'),
    {promisify} = require('util'),
    readFile = promisify(fs.readFile),
    pidFilePath = require('./mock-server-pid-filepath'),
    {error, log} = console;

readFile(pidFilePath, {encoding: 'utf8'})
    .then(pid => {
        log('\nclosing mockerserver pid: ', pid, '...');
        if (pid) {
            try {
                process.kill(pid, 'SIGTERM');
                log('mockserver pid closed.');
            } catch (e) {
                log('\n', e, '\n');
            }
        }
    })
    .then(() => del(pidFilePath))
    .then(() => log(`${pidFilePath} file removed.\n`))
    .catch(error);

