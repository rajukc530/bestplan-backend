module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.addColumn('User', 'hasPaid', {
            type: Sequelize.STRING,
            allowNull: true,
        }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('User'),
};
