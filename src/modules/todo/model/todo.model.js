const { Model, DataTypes } = require("sequelize");

const TODO_TABLE = "todos";

const ToDoSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  finish: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

class ToDo extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TODO_TABLE,
      modelName: "ToDo",
      timestamps: false,
    };
  }
}

module.exports = { TODO_TABLE, ToDoSchema, ToDo };
