module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.bulkInsert('UserAuthority', [
            {
                id: 1,
                name: 'ROLE_ADMIN',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'ROLE_USER',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]),

    down: (queryInterface, Sequelize) =>
        queryInterface.dropTable('UserAuthority'),
};
