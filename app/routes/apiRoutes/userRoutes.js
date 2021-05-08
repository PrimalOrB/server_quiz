const express = require( 'express' );
const router = express.Router();
const db = require( '../../models/db' );

// get all users
router.get( '/users', ( req, res ) => {
    const sql =  `SELECT * FROM users`;
    
    db.query( sql, ( err, rows ) => {
        if ( err ) {
            res.status( 500 ).json( { error: err.message } );
            return;
        }
        res.json( { 
            message: 'success',
            data: rows
         } );
    } );
} );

module.exports = router;