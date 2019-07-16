const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const passport = require('passport');


require('./configs/db.config.js');
require('./configs/passport.config');
require('dotenv').config();

const session = require('./configs/session.config')
const cors = require('./configs/cors.config');

const authRouter = require('./routes/auth.routes');
const commentRouter = require('./routes/comment.routes');
const parkingRouter = require('./routes/parking.routes');
const ordersRouter = require('./routes/orders.routes');
const mailRouter = require('./routes/mail.routes');

const app = express();

const secure = require('./middlewares/secure.mid');
const existsParking= require('./middlewares/parking.mid');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors)
app.use(session)
app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRouter);
app.use('/', commentRouter)
app.use('/parkings', parkingRouter)
app.use('/', mailRouter)
app.use('/parkings/:id/orders', ordersRouter)


app.use((req, res, next) => {
  next(createError(404))
})

app.use((error, req, res, next) => {
  console.error(error);  
  res.status(error.status || 500);
  const data = {};

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);
    data.errors = {}
    Object.keys(error.errors)
      .forEach(field => data.errors[field] = error.errors[field].message)
  } else if (error instanceof mongoose.Error.CastError) {
    res.status(404);
    error.message = 'Resource not found';
  }

  data.message = error.message
  res.json(data);
})

module.exports = app;
