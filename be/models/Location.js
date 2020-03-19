"use strict";

const { User_Locations } = require("../db/sequelize");

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "Location",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      lat: { type: DataTypes.STRING, allowNull: false },
      lon: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Location.associate = function(models) {};
  return Location;
};
