const router = require( 'express' ).Router();
const { Quiz } = require( '../../models' );

    // get all users /api/users
router.get( '/', ( req, res ) => {
    Quiz.findAll( {} )
    .then( dbQuizData => res.json( dbQuizData ) )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } );
} );

    // get one user /api/users/1
router.get( '/:id', ( req, res ) => {
    Quiz.findOne( {
        where: {
            id: req.params.id
        }
    } )
    .then( dbQuizData => res.json( dbQuizData ) )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } );
} );

    // POST new user /api/users
router.post('/', ( req, res ) => {
    console.log( req )

    // expects { username: 'bbb' }
    Quiz.create( { 
        title: req.body.title,
        description: req.body.description,
        public: req.body.public,
        active: req.body.active,
        time_per: req.body.time_per,
        time_bonus: req.body.time_bonus,
        time_penalty: req.body.time_penalty,
        user_id: req.body.user_id
    } )
    .then( dbUserData => {
        req.session.save( () => {
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json( dbUserData )
        } )
    } )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err );
    } );
} );

module.exports = router;