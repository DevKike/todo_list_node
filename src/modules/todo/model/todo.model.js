const { Model, DataTypes } = require("sequelize");
const { USER_TABLE } = require("../../user/model/user.model"); 

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
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onDelete: "CASCADE"
  }
};

class ToDo extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: "user",
       foreignKey: "userId",
       onDelete: "CASCADE", 
    });
  }

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
