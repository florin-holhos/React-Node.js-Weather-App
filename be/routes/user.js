const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
// import user_controller
const user_controller = require("../controllers/userController");

/**USER ROUTES */

/** @POST creates new user and returns it */
router.post("/auth", user_controller.createUser);

/**@POST insert new location for this user */
router.post("/locations", verifyToken, user_controller.addLocation);

/**@GET retrieves all locations for this user */
router.get("/locations", verifyToken, user_controller.getLocations);

/**@DELETE removes a location for a given id */
router.delete("/locations/:id", verifyToken, user_controller.removeLocation);

module.exports = router;
