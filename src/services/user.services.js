const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { Models } = require("../server/models");
const ApiError = require("../utils/ApiError");
const UserModel = Models.models.User;

const createUser = async (userBody) => {
  if (await UserModel.findOne({ where: { email: userBody.email } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  } else {
    userBody.password = await bcrypt.hash(userBody.password, 12);
    const info = await UserModel.create(userBody);
    return { msg: "register successfully", data: info };
  }
};

module.exports = { createUser };
