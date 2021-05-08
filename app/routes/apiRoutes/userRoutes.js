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
    const sql =  `SELECT users.name AS quiz_owner, quizzes.name as quiz_name, questions.question AS question, questions.answer AS quiz_answer, questions.correct AS correct_answer
            FROM users
            JOIN quizzes ON quizzes.owner_id = users.id
            JOIN questions ON questions.quiz_id = quizzes.id
            WHERE questions.active = 1 and users.id = 1;`;
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