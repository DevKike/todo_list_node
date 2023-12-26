const { models } = require("../../../db/sequelize");

const register = async (data) => {
    try{
        const user = await models.User.create(data);
        return user;
    }catch(error){
        console.error(error);
        throw error;
    }
}

module.exports = register;