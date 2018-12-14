/**
 * Diet Schema
 */
module.exports = (sequelize, DataTypes) => {
    const Diet = sequelize.define(
        'Diet',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            protein: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            carbs: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fat: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            calorie: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hasPaid: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            scopes: {
                dietScope: {
                    attributes: {
                        exclude: ['hasPaid', 'updatedAt'],
                    },
                },
                userScope: {
                    attributes: {
                        exclude: ['id', 'hasPaid', 'updatedAt', 'name', 'protein', 'carbs', 'fat', 'createdAt', 'calorie'],
                    },
                },
            },
        },
    );

    return Diet;
};
