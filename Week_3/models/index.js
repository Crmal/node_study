const Sequelize = require("sequelize");
const User = require("./user");
const Content = require("./content");


const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Content = Content;

User.init(sequelize);
Content.init(sequelize);

User.associate(db);
Content.associate(db);

module.exports = db;