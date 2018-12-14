module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Plan', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
            },
            name: {
                type: Sequelize.STRING,
                required: true,
                allowNull: false,
                unique: true,
            },
            price: {
                type: Sequelize.BIGINT,
                required: true,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                required: true,
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

    down: (queryInterface, Sequelize) => queryInterface.dropTable('Plan'),
};
