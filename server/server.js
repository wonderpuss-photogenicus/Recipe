const express = require('express');
const path = require('path');
const app = express();

app.use(
  '/node_modules',
  express.static(path.resolve(__dirname, '../node_modules'))
);
app.use(
  '/client/stylesheets',
  express.static(path.resolve(__dirname, '../client', 'stylesheets'))
);
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});
app.listen(3000, () => console.log('listening on port 3000 :)'));
