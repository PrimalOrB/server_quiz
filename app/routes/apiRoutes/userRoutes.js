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

// get single users
router.get( '/users/:id', ( req, res ) => {
    const sql =  `SELECT users.name, quizzes.name, questions.question, questions.answer, questions.correct
                    FROM users
                    JOIN quizzes ON quizzes.owner_id = users.id
                    JOIN questions ON questions.quiz_id = quizzes.id
                    WHERE questions.active = 1 and users.id = ?`;
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