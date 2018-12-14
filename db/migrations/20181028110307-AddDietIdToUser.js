module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.addColumn('User', 'dietId', {
            type: Sequelize.UUID,
            allowNull: true,
        }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('User'),
};
