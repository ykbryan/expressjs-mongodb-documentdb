const express = require('express');
const app = express();
const mongoose = require('mongoose');
const winston = require('winston');
const port = process.env.PORT || 3000;
let mongodbStatus = 'Not connected';

mongoose.connect(process.env.MONGODB_URL);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  winston.info('Mongoose connected!');
  mongodbStatus = 'Mongoose connected!';
});

mongoose.connection.on('disconnected', () => {
  winston.info('Mongoose disconnected!');
  mongodbStatus = 'Mongoose disconnected!';
});

mongoose.connection.on('error', (err) => {
  winston.error(err.message);
  mongodbStatus = 'Mongoose error! ' + err.message;
  process.exit(1);
});

app.get('/', (req, res) => {
  res.json({ message: 'It works!', mongodb: mongodbStatus });
});

app.listen(port, () => {
  console.log(`running port ${port}`);
});
