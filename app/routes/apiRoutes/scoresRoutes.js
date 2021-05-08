const express = require( 'express' );
const router = express.Router();
const db = require( '../../models/db' );

// get all scores
router.get( '/scores', ( req, res ) => {
    const sql =  `SELECT * FROM scores`;
    
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

// get single score
router.get( '/scores/:id', ( req, res ) => {
    const sql =  `SELECT * FROM scores WHERE id = ?`;
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