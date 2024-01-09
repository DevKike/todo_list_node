const { UserSchema, User } = require('../modules/user/model/user.model');
const { ToDoSchema, ToDo } = require('../modules/todo/model/todo.model')

const setupModel = (sequelize) => {
   User.init(UserSchema, User.config(sequelize)); 
   ToDo.init(ToDoSchema, ToDo.config(sequelize));

   ToDo.belongsTo(User);
   User.hasMany(ToDo);
}

module.exports = setupModel;