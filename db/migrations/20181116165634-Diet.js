module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Diet', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            protein: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            carbs: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            fat: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            calorie: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            hasPaid: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('Diet'),
};
