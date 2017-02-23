var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var config = require('../config');

const dbPassword = config.dbPassword;
const port = config.port;
const connectionString = `postgres://postgres:${dbPassword}@localhost/hikehike`;
var massiveInstance = massive.connectSync({connectionString:connectionString});

var app = module.exports = express();
app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());
app.set('db', massiveInstance);
var serverCtrl = require('./serverCtrl.js');

app.post('/api/hikes', serverCtrl.createHike);
app.get('/api/hikes', serverCtrl.getAllHikes);
app.get('/api/hikes/:name', serverCtrl.getOneHike);
app.delete('/api/hikes/:name', serverCtrl.deleteHike);


app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
})