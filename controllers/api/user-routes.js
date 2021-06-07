const router = require( 'express' ).Router();
const { User, Quiz } = require( '../../models' );

    // get all users /api/users
router.get( '/', ( req, res ) => {
    User.findAll( {
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
    .then( dbUserData => res.json( dbUserData ) )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } );
} );

    // POST new user /api/users
router.post('/', ( req, res ) => {
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

    // POST /api/users/check
router.post('/check', ( req, res ) => {
    // expects array 
    const data = req.body

        // array to hold the data
    const user = []
    
        // promise check each index against current user list
    var promises = data.map( (x, i) => {
        return User.findOne( {
                    where: {
                        username: x.username
                    }
                } )
            .then(dbUserData => {
                    // if user does not exist
                if( !dbUserData ) {
                        // create new user
                    return User.create( { 
                        username: x.username
                    } )
                    .then( dbUserData =>  {
                            // post current index, and the id of the newly created user
                            user.push( { input_index: i, user_id: dbUserData.dataValues.id } )
                    } )
                    .catch( err => {
                        console.log( err )
                        res.status( 500 ).json( err );
                    } );
                }
                    // push current index and matching user id
                    user.push( { input_index: i, user_id: dbUserData.dataValues.id } )
                return;
            } ) 
            .catch( err => {
                console.log( err )
                res.status( 500 ).json( err );
            } );
        } )

        // once resolved, return the user array
        Promise.all( promises )
        .then( () => {
            res.json( user )
        } )
} );

module.exports = router;