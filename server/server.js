const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// const apiRouter = require('./routes/api');

//--m handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//define route handlers
// app.use('/api', apiRouter);

//handle requests for static files
// app.use(express.static(path.resolve(__dirname, '../client')));

// catch-all route handler for any requests to an unknown route
// app.use((req, res) => res.status(404).send('This is not the recipe you\'re looking for...'));

// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

// --j
const usersRouter = require('./routers/users')
app.use('/users', usersRouter)

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(3000, () => console.log('listening on port 3000 :)'));
