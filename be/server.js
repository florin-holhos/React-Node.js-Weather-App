const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// set up environment variables
const dotenv = require("dotenv");
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: envFile });

// set up connection
const { sequelize } = require("./db/sequelize");

// import routes
const indexRouter = require("./routes");
const userRouter = require("./routes/user");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// routes
app.use("/", indexRouter);
app.use("/api/user", userRouter);

const listener = app.listen(process.env.PORT || 9000, () => {
  const { address, port } = listener.address();
  console.log(
    `Listen on http://${address === "::" ? "localhost" : address}:${port}`
  );
});

//test DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB...");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// export app for tests
module.exports = { app };
