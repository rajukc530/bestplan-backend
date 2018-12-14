'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Conversation', [{
      id: "6175a580-32b3-4351-877e-0984c4d5d8ad",
      name: "Fun Conversation"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Conversation', null, {});
  }
};
