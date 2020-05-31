require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const checkAccessRights = require('./src/config/helpers').checkAccessRights

const dbconnection = require('./src/config/dbconnect')
const router = require('./routes/index')
const passport = require('./src/config/Passportconfig')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: dbconnection,
    autoRemove:'native',
    autoRemoveInterval:'1440'
  }),
  cookie:{
    maxAge:1000*60*60*24
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(checkAccessRights) open in production

app.use('/',router.commonroutes)
app.use('/adminapi', router.adminroutes);
app.use('/staffapi', router.staffroutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

process.on('uncaughtException', (err, origin) => {
  console.log({
    err,
    origin
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
