const { models } = require("../../../db/sequelize");

const create = async (data) => {
    try{
        const user = await models.User.create(data);
        return user;
    }catch(error){
        console.error(error);
        throw error;
    }
}

module.exports = { create };