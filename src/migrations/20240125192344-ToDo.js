'use strict';

const { TODO_TABLE, ToDoSchema } = require('../modules/todo/model/todo.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TODO_TABLE, ToDoSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(TODO_TABLE);
  }
};
