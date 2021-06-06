const express = require('express');
const sequelize = require( './config/connection' );
const path = require('path');
const routes = require( './controllers/' );
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv').config();
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const flash = require('connect-flash');
const exphbs = require( 'express-handlebars' );
const hbs = exphbs.create( {  } );

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done( null, profile );
  }
);

passport.use( strategy );
passport.serializeUser( function ( user, done ) {
  done( null, user );
});
passport.deserializeUser( function ( user, done ) {
  done( null, user );
});

// View engine setup
app.engine( 'handlebars', hbs.engine );
app.set( 'view engine', 'handlebars' );

app.use( logger('dev') );
app.use( cookieParser() );

// config express-session
var sess = {
  secret: process.env.SECRET,
  cookie: { 
    maxAge: (1000 * 60) * 10 },  // 10 min idle time
  rolling: true, // rolling cookie for idle detection
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore( {
    db: sequelize
} )
};

if (app.get('env') === 'production') {
  // If you are using a hosting provider which uses a proxy (eg. Heroku),
  // comment in the following app.set configuration command
  //
  // Trust first proxy, to prevent "Unable to verify authorization request state."
  // errors with passport-auth0.
  // Ref: https://github.com/auth0/passport-auth0/issues/70#issuecomment-480771614
  // Ref: https://www.npmjs.com/package/express-session#cookiesecure
  // app.set('trust proxy', 1);
  
  sess.cookie.secure = true; // serve secure cookies, requires https
}
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( session( sess ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( express.static(path.join(__dirname, 'public') ) );
app.use( flash() );

// Handle auth failure error messages
// app.use( function ( req, res, next ) {
//   if ( req && req.query && req.query.error ) {
//     req.flash( 'error', req.query.error );
//   }
//   if ( req && req.query && req.query.error_description ) {
//     req.flash( 'error_description', req.query.error_description );
//   }
//   next();
// } );

app.use( routes )

// Catch 404 and forward to error handler
// app.use( function ( req, res, next ) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next( err );
// } );

// Error handlers

// Development error handler
// Will print stacktrace
// if ( app.get( 'env' ) === 'development' ) {
//   app.use( function ( err, req, res, next ) {
//     res.status( err.status || 500 );
//     res.render( 'error', {
//       message: err.message,
//       error: err
//     } );
//   } );
// }

// Production error handler
// No stacktraces leaked to user
// app.use( function ( err, req, res, next ) {
//   res.status( err.status || 500 );
//   res.render( 'error', {
//     message: err.message,
//     error: {}
//   } );
// } );

sequelize.sync( { force: false } ).then( () => {
  app.listen( PORT, () => console.log( 'Now listening' ) );
} );
