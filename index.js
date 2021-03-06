const express = require('express');
const router = express.Router();

module.exports = router;

const logger = require('morgan');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(logger('tiny'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require(path.join(__dirname)));

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500 );
  res.json({
    error: {
      message: err.message,
    },
  });
});

// app.get('/', (req, res) => {
//   res.send('Welcome to the PokemonGO API.');
// })

app.listen(PORT, () => console.log(`Express server started on port ${PORT}`)); 
