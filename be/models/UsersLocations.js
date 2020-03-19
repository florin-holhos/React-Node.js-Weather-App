"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users_Locations = sequelize.define("Users_Locations", {
    // Foreign Key to User.id
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    // array with locations
    locations: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  Users_Locations.associate = function(models) {};
  return Users_Locations;
};
