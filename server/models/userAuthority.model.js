/**
 * UserAuthority Schema
 */
module.exports = (sequelize, DataTypes) => {
    const UserAuthority = sequelize.define(
        'UserAuthority',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
            },
            name: {
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
        },
    );

    return UserAuthority;
};
