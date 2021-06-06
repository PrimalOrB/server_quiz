const router = require( 'express' ).Router();
const { User } = require( '../../models' );

    // get all users /api/users
router.get( '/', ( req, res ) => {
    User.findAll( {} )
    .then( dbUserData => res.json( dbUserData ) )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } );
} );

    // get one user /api/users/1
router.get( '/:id', ( req, res ) => {
    User.findOne( {
        where: {
            id: req.params.id
        }
    } )
    .then( dbUserData => res.json( dbUserData ) )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } );
} );

    // POST new user /api/users
router.post('/', ( req, res ) => {
    console.log( req )

    // expects { username: 'bbb' }
    User.create( { 
        username: req.body.username
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