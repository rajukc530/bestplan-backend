module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('UserRoles', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            roleId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('UserRoles'),
};
