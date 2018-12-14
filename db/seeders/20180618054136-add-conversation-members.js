'use strict';
const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ConversationMember', [{
      id: uuid(),
      conversationId: "6175a580-32b3-4351-877e-0984c4d5d8ad",
      userId: "49e2c58e-e49f-404e-83ea-1b4c651421b5"
    }, {
      id: uuid(),
      conversationId: "6175a580-32b3-4351-877e-0984c4d5d8ad",
      userId: "f680b1bd-3b32-4c36-b7ae-df6ce3be1026"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ConversationMember', null, {});
  }
};
