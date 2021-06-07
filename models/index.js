const User = require( './User' );
const Quiz = require( './Quiz' );
const Question = require( './Question' );
const Score = require( './Score' );

User.hasMany( Quiz, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
} );

Quiz.belongsTo( User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
} );

Question.belongsTo( Quiz,{
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
} );

Quiz.hasMany( Question, {
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
} );

Score.belongsTo( User,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
} );

Score.belongsTo( Quiz,{
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
} );

User.hasMany( Score, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
} );

Quiz.hasMany( Score, {
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
} );

module.exports = { User, Quiz, Question, Score };