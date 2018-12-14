'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [{
        id: "49e2c58e-e49f-404e-83ea-1b4c651421b5",
        name: 'a1'
      }, {
        id: "f680b1bd-3b32-4c36-b7ae-df6ce3be1026",
        name: 'a2'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
