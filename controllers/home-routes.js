var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render( 'homepage', { 
    user: req.session.username,
    picture: req.session.picture,
    loggedIn: req.session.loggedIn
  } );
});

/* GET profile page. */
router.get('/profile', function (req, res, next) {
  res.render( 'profile', { 
    user: req.session.username,
    picture: req.session.picture,
    loggedIn: req.session.loggedIn
  } );
});

module.exports = router;
