const { config } = require("dotenv");
config();

module.exports = {
  SERVER: {
    PORT: process.env.PORT || 3001,
  },
};
