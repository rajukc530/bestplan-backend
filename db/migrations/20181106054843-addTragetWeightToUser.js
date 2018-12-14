module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.addColumn('User', 'targetWeight', {
            type: Sequelize.FLOAT,
            allowNull: true,
        }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('User'),
};
