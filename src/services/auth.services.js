const bcrypt = require("bcryptjs");
const httpStatus = require("http-status");
const { Models } = require("../server/models");
const ApiError = require("../utils/ApiError");
const UserModel = Models.models.User;

const loginWithEamilAndPassword = async (email, password) => {
  const userInfo = await UserModel.findOne({
    attributes: ["id", "name", "email", "password", "role"],
    where: { email },
  });

  if (!userInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exist");
  }
  const isPasswordValid = await bcrypt.compare(password, userInfo.password);
  if (isPasswordValid) {
    delete userInfo.dataValues.password;
    return userInfo;
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
};

module.exports = { loginWithEamilAndPassword };
