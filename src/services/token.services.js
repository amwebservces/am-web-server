const Jwt = require('jsonwebtoken')
const moment = require('moment')
const config = require("../configs/config");
const { tokenTypes } = require("../utils/tokens");

const generateToken = (
  userId,
  expires,
  type,
  role,
  secret = config.jwt.secret,
) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
        role
    }
    return Jwt.sign(payload, secret)
};

const generateAuthTokens = async(user) => {
    const accessTokenExpires = moment().add(
        config.jwt.accessExpirationMinutes,
        "minutes"
    )

    const accessToken =generateToken(
        user.id,
        accessTokenExpires,
        tokenTypes.ACCESS,
        user.role
    )

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        }
    }
}

module.exports = {
    generateToken,
    generateAuthTokens
}
