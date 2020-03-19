const Sequelize = require("sequelize");
const UserModel = require("../models/User");
const LocationModel = require("../models/Location");
const Users_LocationsModel = require("../models/UsersLocations");

console.log(process.env.DB_NAME);
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "127.0.0.1",
    dialect: "mysql"
  }
);

const User = UserModel(sequelize, Sequelize);
const Location = LocationModel(sequelize, Sequelize);
const User_Locations = Users_LocationsModel(sequelize, Sequelize);

module.exports = {
  sequelize,
  User,
  Location,
  User_Locations
};
