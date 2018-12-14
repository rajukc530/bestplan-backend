module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.addColumn('User', 'trainingId', {
            type: Sequelize.UUID,
            allowNull: true,
        }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('User'),
};
