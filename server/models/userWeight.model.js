/**
 * UserWeight Schema
 */
module.exports = (sequelize, DataTypes) => {
    const UserWeight = sequelize.define(
        'UserWeight',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            weight: {
                type: DataTypes.FLOAT,
                allowNull: true,
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
        },
    );

    return UserWeight;
};
