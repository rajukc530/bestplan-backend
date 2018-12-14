module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('PageVisits', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: true,
            },
            ipAddress: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            page: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('PageVisits'),
};
