import Sequelize from "sequelize";
import User from "./user";
import Content from "./content";


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

init(sequelize);
Content.init(sequelize);
Product.init(sequelize);

associate(db);
Content.associate(db);
Product.init(db);

export default db;