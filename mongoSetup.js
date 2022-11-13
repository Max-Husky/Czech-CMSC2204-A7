const MONGO_DB_URL = "mongodb+srv://admin:M5tMmEGQ2K73p8G@cluster0.j7moqfs.mongodb.net/A7?retryWrites=true&w=majority";

const mongo = require('mongoose');
const fs = require('fs');

mongo.connect(MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongo.connection;

// db connection/error messages
db.once('open', () => {console.log(`Mongo Connected`)});
db.on('error', err => {
  console.log('Error in mongo: ' + err);
});

/**
 * loads in the models for mongo
 * @param {mongo.Connection} db The mongo database to load the models to
 */
async function getModels(db) {
  let models = fs.promises.readdir(__dirname + '/models', {encoding: 'utf8'});

  models = await models;
  for (let i of models) {
    console.debug(`loading model: ${i}`);
    try {
      db.model(i.slice(0, i.indexOf('.')), require(__dirname + '/models/' + i));
    } catch {
      console.error(`Failed to load model: ${i}`);
    }
  }
}

getModels(db);

module.exports = db;
