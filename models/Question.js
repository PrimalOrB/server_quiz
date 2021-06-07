const { Model, DataTypes } = require( 'sequelize' );
const sequelize = require( '../config/connection' );

// create User model
class Question extends Model {}

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'quiz',
                key: 'id'
            }
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correct: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        // table config options
        sequelize, // imported sequelize connection
        timestamps: false, // don't automatically create timestamp fields for createdAt / updatedAt
        freezeTableName: true, // don't pluralize table name
        underscored: true, // instead of camelcase
        modelName: 'question' // lowercase for db
    }
);

module.exports = Question;