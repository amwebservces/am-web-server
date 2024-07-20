const httpStatus = require("http-status");
const { authServices, userService, tokenServices } = require("../services");
const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req, res, next) => {
  let user = await userService.createUser(req.body);
  const tokens = await tokenServices.generateAuthTokens(user)
  res.status(httpStatus.CREATED).send({user, tokens});
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await authServices.loginWithEamilAndPassword(email, password);
  const tokens = await tokenServices.generateAuthTokens(user)
  res.status(httpStatus.OK).send({user, tokens});
});

module.exports = { register, login };
