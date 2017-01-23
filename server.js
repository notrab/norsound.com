const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const pug = require('pug');
const Server = require('http').Server;
const routes = require('./routes');

const app = express();
const httpServer = Server(app);

const isDeveloping = (process.env.NODE_ENV != 'production');

if (isDeveloping) {
  app.use(logger('dev'));
}

app.disable('x-powered-by');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(routes);

app.use((req, res, next) => {
  const err = new Error('Page Not Found');

  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = isDeveloping ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

httpServer.listen(app.get('port'));
httpServer.on('listening', () => {
  console.log(`App listening on http://localhost:${app.get('port')}`);
});

module.exports = app;
