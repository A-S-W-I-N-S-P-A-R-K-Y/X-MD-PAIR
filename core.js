// Aswin Sparky 
const cluster = require('cluster');
const path = require('path');
const fs = require('fs');
const Readline = require('readline');

let isRunning = false;

function start(file, ...args) {
  if (isRunning) return;
  isRunning = true;

  args = [path.join(__dirname, file), ...args];

  cluster.setupMaster({
    exec: path.join(__dirname, file),
    args: args.slice(1),
  });

  let p = cluster.fork();
  p.on('message', data => {
    console.log('[RECEIVED]', data);
    switch (data) {
      case 'reset':
        p.kill();
        isRunning = false;
        start(file, ...args);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });

  p.on('exit', code => {
    isRunning = false;
    console.error('Exited with code:', code);
    if (code === 0) return;

    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0]);
      start(file, ...args);
    });
  });
}

start('index.js');
    
