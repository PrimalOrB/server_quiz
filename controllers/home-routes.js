var express = require('express');
var router = express.Router();
var secured = require('../lib/middleware/secured');
const { User, Quiz } = require( '../models' );

// Home Page
router.get('/', function (req, res, next) {
  res.render( 'homepage', { 
    user: req.session.username,
    picture: req.session.picture,
    loggedIn: req.session.loggedIn
  } );
});

module.exports = router;
