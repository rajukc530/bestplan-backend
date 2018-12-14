/**
 * Plan Schema
 */
module.exports = (sequelize, DataTypes) => {
    const Plan = sequelize.define(
        'Plan',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            price: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
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
                planScope: {
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'description'],
                    },
                },
                userPlanScope: {
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            },
        },
    );

    return Plan;
};
