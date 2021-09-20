const path = require('path');
const express = require('express');

const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');
const db = mongoose.connection;
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
const usersRouter = require('./routers/users');
app.use('/users', usersRouter);

// const apiRouter = require('./routes/api');

const PORT = 3000;

//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')));

//define route handlers
// app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("This is not the recipe you're looking for...")
);

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
