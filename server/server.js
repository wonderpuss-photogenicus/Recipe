const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = require('./routers/users')
app.use('/users', usersRouter)

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(3000, () => console.log('listening on port 3000 :)'));