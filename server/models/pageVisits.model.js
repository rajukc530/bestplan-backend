/**
 * PageVisits Schema
 */
module.exports = (sequelize, DataTypes) => {
    const PageVisits = sequelize.define(
        'PageVisits',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            ipAddress: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            page: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        },
    );

    return PageVisits;
};
