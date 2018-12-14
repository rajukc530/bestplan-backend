module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('UserWeight', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            weight: {
                type: Sequelize.FLOAT,
                allowNull: true,
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

    down: (queryInterface, Sequelize) => queryInterface.dropTable('UserWeight'),
};
