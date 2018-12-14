/**
 * UserRoles Schema
 */
module.exports = (sequelize, DataTypes) => {
    const UserRoles = sequelize.define(
        'UserRoles',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            roleId: {
                type: DataTypes.BIGINT,
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
                nameScope: {
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            },
        },
    );

    return UserRoles;
};
