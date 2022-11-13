const PORT = 1200;

const mongodb = require('./mongoSetup');
const express = require('express');
const fs = require('fs');
const db = require('./mongoSetup');

var api = express();
api.listen(PORT, () => {console.log(`Express listening on port: ${PORT}`)});
api.use(express.json());

/**
 * Loads in the paths for express
 */
async function loadPaths() {
  let gets = fs.promises.readdir(__dirname + '/paths/get', {encoding: 'utf8'}),
      posts = fs.promises.readdir(__dirname + '/paths/post', {encoding: 'utf8'});

  gets = await gets;
  for (let i of gets) {
    try {
      api.get('/' + i.slice(0, + i.indexOf('.')), require(__dirname + '/paths/get/' + i).bind(undefined, mongodb));
      console.debug(`loaded get: /${i.slice(0, i.indexOf('.'))}`);
    } catch {
      console.error(`Failed to add: paths/get/${i} to express`);
    }
  }

  posts = await posts;
  for (let i of posts) {
    try {
      api.post('/' + i.slice(0, i.indexOf('.')), require(__dirname + '/paths/post/' + i).bind(undefined, mongodb));
      console.debug(`loaded post: /${i.slice(0, i.indexOf('.'))}`);
    } catch {
      console.error(`Failed to add: paths/post/${i.slice(0, i.indexOf('.'))} to express`);
    }
  }
}

loadPaths();

process.once('exit', () => {db.close()});

// simple commands interface
process.stdin.on('data', (data) => {
  let commands = data.toString('utf8').split('\n');

  for (let c of commands) {
    switch (c.trim()) {
      case "q":
      case "quit":
      case "exit":
        process.exit();
        break;
      default:
        console.log(`Unknown command ${c}`);
        break;
    }
  }
});
