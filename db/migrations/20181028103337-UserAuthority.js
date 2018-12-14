module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('UserAuthority', {
            id: {
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            name: {
                type: Sequelize.STRING,
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

    down: (queryInterface, Sequelize) =>
        queryInterface.dropTable('UserAuthority'),
};
