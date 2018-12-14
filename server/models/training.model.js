/**
 * Training Schema
 */
module.exports = (sequelize, DataTypes) => {
    const Training = sequelize.define(
        'Training',
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
                trainingScope: {
                    attributes: {
                        exclude: ['hasPaid', 'updatedAt'],
                    },
                },
                userScope: {
                    attributes: {
                        exclude: ['id', 'hasPaid', 'updatedAt', 'name', 'createdAt'],
                    },
                },
            },
        },
    );

    return Training;
};
