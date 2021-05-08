const express = require( 'express' );
const router = express.Router();
const db = require( '../../models/db' );

// get all quizzes
router.get( '/quizzes', ( req, res ) => {
    const sql =  `SELECT * FROM quizzes`;
    
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

// get single quiz
router.get( '/quizzes/:id', ( req, res ) => {
    const sql =  `SELECT * FROM quizzes WHERE id = ?`;
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