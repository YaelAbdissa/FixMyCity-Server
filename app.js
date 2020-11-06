var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyparser = require('body-parser')
var logger = require('morgan');
var jwt = require('express-jwt');
var session = require('express-session');

var cors = require('cors')


const mongoose = require('./config/mongoose');
const { jwt_key,port,session_key } = require('./config/vars');
const {routes} = require('./config/routes')
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var reportRouter = require('./routes/reports');
var adminRouter = require('./routes/admin');
var municipalityRouter = require('./routes/municipal');
var tokenRouter = require('./routes/token');
var rateRouter = require('./routes/rate');


var app = express();


const expressSwagger = require('express-swagger-generator')(app);

let options = {
  swaggerDefinition: {
      info: {
          description: 'Fix My City Project',
          title: 'Fix My City',
          version: '1.0.0',
      },
      host: `localhost:${port}`,
      basePath: '/',
      produces: [
          "application/json"
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: "",
          }
      }
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/*.js'] //Path to the API handle folder
};

expressSwagger(options)




mongoose.connect();

app.use(logger('dev'));
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public/'));
app.use(cors())


app.use(jwt({ secret: jwt_key, algorithms: ['HS256']})
.unless({path: routes.public}));

app.use(session({
  secret: session_key,
  resave: false,
  saveUninitialized: true
}))

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/reports', reportRouter);
app.use('/admin', adminRouter);
app.use('/municipality', municipalityRouter);
app.use('/firebase', tokenRouter)
app.use('/rate', rateRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;
