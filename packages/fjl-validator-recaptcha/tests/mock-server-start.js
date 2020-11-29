const fs = require('fs'),
    path = require('path'),
    {spawn} = require('child_process'),
    del = require('del'),
    pidFilePath = require('./mock-server-pid-filepath'),
    {error, log} = console;

const child = spawn(
    'node', [path.join(__dirname, './mock-server.js')], {
        detached: true,
        stdio: 'ignore'
    }),
    writePidFile = () => {
        // Store child process pid
        fs.writeFile(pidFilePath, child.pid, err => {
            if (err) {
                error(err);
                return;
            }
            log(`\nmock-server pid ${child.pid} written to ${pidFilePath} successfully.\n`);
        });
    };

child.on('close', (code) => {
    log(`child process exited with code ${code}`);
});

child.unref();

// Remove any existing mockserver_pid file
del(pidFilePath)
    .then(writePidFile, writePidFile);
