const { app } = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("Server!", () => {
  const test_location1 = {
    lat: "39.029999",
    lon: "121.699997",
    name: "Dalianwan, China"
  };

  const test_location2 = {
    lat: "45.759998",
    lon: "21.230000",
    name: "Timisoara, Romania"
  };

  let token; // initialize this token in POST api/user/auth

  it("Welcomes user to the api", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("Welcome to weather API!");
        done();
      });
  });

  // POST api/user/auth
  it("should create a new user and return it", done => {
    chai
      .request(app)
      .post("/api/user/auth")
      .end((err, res) => {
        //initalize token
        token = res.body.token;
        expect(res).to.have.status(200);
        expect(res.body).exist;
        // the new user has an id and a token
        expect(res.body).haveOwnProperty("id");
        expect(res.body).haveOwnProperty("token");
        done();
      });
  });

  // POST api/user/locations
  // post location without a token or token is modified
  it("should return Access Denied! and status 401", done => {
    chai
      .request(app)
      .post("/api/user/locations")
      .send(test_location1)
      .end((err, res) => {
        expect(res.status).to.equals(401);
        expect(res.text).to.equals("Access Denied!");
        done();
      });
  });

  //GET api/user/locations/
  it("should show message:'No locations found for this user!' when there are no locations", done => {
    chai
      .request(app)
      .get("/api/user/locations")
      .set("weather_app_token", token)
      .end((err, res) => {
        expect(res.text).equals("No locations found for this user!");
        done();
      });
  });

  //DELETE
  it("should show message:'Nothing to remove' when there are no locations", done => {
    chai
      .request(app)
      .delete("/api/user/locations/7")
      .set("weather_app_token", token)
      .end((err, res) => {
        expect(res.text).equals("Nothing to remove!");
        done();
      });
  });

  // POST api/user/locations
  it("should insert into User_locations for a given user(token) and return it with a weather property", done => {
    chai
      .request(app)
      .post("/api/user/locations")
      .set(
        "weather_app_token",
        // because this user doesn't have any locations
        token
      )
      .send(test_location1)
      .end((err, res) => {
        expect(res.body).haveOwnProperty("weather");
        expect(res.body.weather).haveOwnProperty("today");
        expect(res.body.weather).haveOwnProperty("forecast");
        done();
      });
  });

  // POST api/user/locations
  it("should update User_locations for a given user(token) and return it with a weather property", done => {
    chai
      .request(app)
      .post("/api/user/locations")
      .set(
        "weather_app_token",
        // because this user already has some locations
        token
      )
      .send(test_location2)
      .end((err, res) => {
        expect(res.body).haveOwnProperty("weather");
        expect(res.body.weather).haveOwnProperty("today");
        expect(res.body.weather).haveOwnProperty("forecast");
        done();
      });
  });

  //GET api/user/locations
  it("should get locations", done => {
    chai
      .request(app)
      .get("/api/user/locations")
      .set("weather_app_token", token)
      .end((err, res) => {
        expect(res.body.length).above(0);
        done();
      });
  });

  // GET api/user/locations
  it("should return Invalid Token! when trying to get locations with a modified token ", done => {
    chai
      .request(app)
      .get("/api/user/locations")
      .set("weather_app_token", token + "x") // added an extra character
      .end((err, res) => {
        expect(res.text).equals("Invalid Token!");
        done();
      });
  });

  //DELETE api/user/location/:id
  it("should delete an existing location for a given token and id", done => {
    chai
      .request(app)
      .delete("/api/user/locations/1")
      .set("weather_app_token", token)
      .end((err, res) => {
        expect(res.text).equals("Location deleted!");
        done();
      });
  });

  //DELETE api/user/locations/
  it("should show message:'User doesn't have this location!' when try to delete a location that doesn't exist", done => {
    chai
      .request(app)
      .delete("/api/user/locations/4459598")
      .set("weather_app_token", token)
      .end((err, res) => {
        expect(res.text).equals("User doesn't have this location!");

        done();
      });
  });

  //DELETE api/user/locations/
  it("should show message:'Invalid location ID type! (Number required)' when try to delete a location with NaN id", done => {
    chai
      .request(app)
      .delete("/api/user/locations/aaa")
      .set("weather_app_token", token)
      .end((err, res) => {
        expect(res.text).equals("Invalid location ID type! (Number required)");
        done();
      });
  });

  //DELETE api/user/locations/
  it("should delete the last location for this user if the user has only one location ", done => {
    chai
      .request(app)
      .delete("/api/user/locations/2")
      .set("weather_app_token", token)
      .end((err, res) => {
        expect(res.text).equals("Location deleted!");
        done();
      });
  });
});
