module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('User', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
            },
            planId: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dob: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            gender: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phoneNo: {
                type: Sequelize.BIGINT,
                allowNull: false,
                unique: true,
            },
            goal: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            height: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            weight: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            pal: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            isActive: {
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

    down: (queryInterface, Sequelize) => queryInterface.dropTable('User'),
};
