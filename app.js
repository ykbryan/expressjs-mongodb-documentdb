const express = require('express');
const app = express();
const mongoose = require('mongoose');
const winston = require('winston');

mongoose.connect(process.env.MONGODB_URL);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  winston.info('Mongoose connected!');
});

mongoose.connection.on('disconnected', () => {
  winston.info('Mongoose disconnected!');
});

mongoose.connection.on('error', (err) => {
  winston.error(err.message);
  process.exit(1);
});

app.get('/', (req, res) => {
  res.json({ message: 'It works!' });
});

app.listen(3000, () => {
  console.log('running port 3000');
});
