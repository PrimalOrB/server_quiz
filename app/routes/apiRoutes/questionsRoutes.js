const express = require( 'express' );
const router = express.Router();
const db = require( '../../models/db' );

// get all questions
router.get( '/questions', ( req, res ) => {
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

// get single question
router.get( '/questions/:id', ( req, res ) => {
    const sql =  `SELECT * FROM questions WHERE id = ?`;
    const params = [ req.params.id ]
    
    db.query( sql, params, ( err, rows ) => {
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