const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");
const { User, Location, User_Locations } = require("../db/sequelize");
const weatherService = require("../services/weatherService");

// Creates a new user and returns it
exports.createUser = async (req, res) => {
  const token = jwt.sign({ uuid: uuid4() }, process.env.TOKEN_SECRET, {
    expiresIn: "7d"
  });
  console.log("called");
  const user = await User.create({ token });
  return res.send(user);
};

// Sets a new location for the current user
exports.addLocation = async (req, res) => {
  // identify user
  const token = req.header("weather_app_token");
  const user = await User.findOne({
    attributes: ["id"],
    where: { token: token }
  });

  // get user's id
  const userId = user.id;

  // Check if location exists into DB
  let location = await Location.findOne({
    where: { name: req.body.name },
    attributes: ["id", "name", "lat", "lon"],
    raw: true
  });

  // If location doesn't exists then create it
  if (!location) {
    location = await Location.create(req.body);
    // format result
    location = {
      id: location.dataValues.id,
      name: location.dataValues.name,
      lat: location.dataValues.lat,
      lon: location.dataValues.lon
    };
  }

  // get location id
  const loc_id = location.id;

  // get all locations for this user
  const userLocations = await User_Locations.findOne({
    attributes: ["locations"],
    where: { user_id: userId }
  });

  // check if user has locations
  if (!userLocations) {
    // if null => insert new row
    User_Locations.create({
      user_id: userId,
      locations: JSON.stringify([loc_id])
    });
  } else {
    // check if user already has this location
    const locations = JSON.parse(userLocations.locations);
    if (!locations.find(id => loc_id === id)) {
      // update locations for this user
      User_Locations.update(
        { locations: JSON.stringify([...locations, loc_id]) },
        { where: { user_id: userId } }
      );
    }
  }
  // get weather for this location
  const weather = await weatherService.getWeather(location);
  location.weather = weather;

  // finally return location with weather property
  return res.send(location);
};

// retrieves all locations for the current user
exports.getLocations = async (req, res) => {
  const token = req.header("weather_app_token");
  const user = await User.findOne({
    attributes: ["id"],
    where: { token: token }
  });
  const userId = user.id;

  // get locations IDs
  const userLocations = await User_Locations.findOne({
    where: { user_id: userId },
    attributes: ["locations"],
    raw: true
  });
  if (!userLocations)
    return res.status(404).send("No locations found for this user!");
  const locations_IDs = JSON.parse(userLocations.locations);

  // get locations
  const locations = await Location.findAll({
    where: { id: locations_IDs },
    raw: true
  });

  // add weather prop to to each location
  const weather = await weatherService.getWeatherForeach(locations);
  locations.forEach((loc, index) => {
    loc.weather = weather[index];
  });
  // finally return locations with weather
  res.send(locations);
};

// removes a location for a given id
exports.removeLocation = async (req, res) => {
  let loc_id = req.params.id;
  // check if id is a number
  if (isNaN(Number(loc_id)))
    return res.status(400).send("Invalid location ID type! (Number required)");
  loc_id = Number(loc_id);

  // get user from token
  const token = req.header("weather_app_token");
  const user = await User.findOne({
    attributes: ["id"],
    where: { token: token }
  });

  // get user's id
  const userId = user.id;

  // get locations for this user id
  const userLocations = await User_Locations.findOne({
    attributes: ["locations"],
    where: { user_id: userId },
    raw: true
  });

  // check if there is something to remove
  if (!userLocations) return res.status(404).send("Nothing to remove!");
  const locationsIds = JSON.parse(userLocations.locations);

  // check if user has this location
  if (!locationsIds.includes(loc_id))
    return res.status(400).send("User doesn't have this location!");

  // if this location is the last one
  // remove user from Users_Locations table
  if (locationsIds.length === 1) {
    User_Locations.destroy({ where: { user_id: userId } });
    return res.status(200).send("Location deleted!");
  }
  // update the locations array for this user
  User_Locations.update(
    {
      locations: JSON.stringify(
        locationsIds.filter(id => {
          return id !== loc_id;
        })
      )
    },
    { where: { user_id: userId } }
  );

  return res.status(200).send("Location deleted!");
};
