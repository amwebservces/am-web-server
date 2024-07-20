const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const httpStatus = require("http-status");
const passport = require("passport");
const routes = require("./routes/v1");
const { authLimiter } = require("./middlewares/rateLimiter");
const config = require("./configs/config");
const { jwtStrategy } = require("./utils/passport");
const ApiError = require("./utils/ApiError");
const bodyParser = require('body-parser')

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

// sanitize request data
app.use(xss());

//
app.use(helmet());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// v1 api routes
app.use("/v1", routes);

// PING routes
app.use("/ping", (req, res, next) => {
  return res.json({});
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
});

module.exports = app;
