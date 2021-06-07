var express = require('express');
var secured = require('../lib/middleware/secured');
var router = express.Router();
const { User, Quiz } = require( '../models' );

/* GET user profile. */
router.get('/', secured(), function (req, res, next) {
  User.findOne( {
      where: {
          id: req.session.user_id
      },
      include: [
          {
              model: Quiz,
              attributes: ['id','title','description'],
              where: {
                  active: true
              }
          }
      ]
  } )
  .then( dbUserData => {
    const quizzes = dbUserData.quizzes.map( quizzes => quizzes.get( { plain: true } ) );
    res.render( 'dashboard', { 
        user: req.session.username,
        picture: req.session.picture,
        loggedIn: req.session.loggedIn,
        quizzes: quizzes
      } );
  } )
  .catch( err => {
      console.log( err );
      res.status( 500 ).json( err );
  } );
} );

module.exports = router;
