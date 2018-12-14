module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.bulkInsert('Plan', [
            {
                id: '2991583a-1772-4f2e-ac40-06bdc71d31f6',
                name: 'Training & Diet',
                price: '349',
                description: 'Training & Diet',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '443c52a8-9db2-4aa4-a3be-38c993c89bcd',
                name: 'Training',
                price: '199',
                description: 'Training',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '6b1127a0-547b-44ea-af04-ea901c5ced15',
                name: 'Diet',
                price: '199',
                description: 'Diet',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('Plan'),
};
