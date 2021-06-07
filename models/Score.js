const { Model, DataTypes } = require( 'sequelize' );
const sequelize = require( '../config/connection' );

// create User model
class Score extends Model {}

Score.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'quiz',
                key: 'id'
            }
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        // table config options
        sequelize, // imported sequelize connection
        timestamps: false, // don't automatically create timestamp fields for createdAt / updatedAt
        freezeTableName: true, // don't pluralize table name
        underscored: true, // instead of camelcase
        modelName: 'score' // lowercase for db
    }
);

module.exports = Score;