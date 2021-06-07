const { Model, DataTypes } = require( 'sequelize' );
const sequelize = require( '../config/connection' );

// create User model
class Quiz extends Model {}

Quiz.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        public: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        time_per: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        time_bonus: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        time_penalty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'quiz',
                key: 'id'
            }
        },
    },
    {
        // table config options
        sequelize, // imported sequelize connection
        timestamps: false, // don't automatically create timestamp fields for createdAt / updatedAt
        freezeTableName: true, // don't pluralize table name
        underscored: true, // instead of camelcase
        modelName: 'quiz' // lowercase for db
    }
);

module.exports = Quiz;