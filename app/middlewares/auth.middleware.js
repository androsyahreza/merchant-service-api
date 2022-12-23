const jwt = require("jsonwebtoken");
const { AuthResponse } = require("../helpers/api.response")
const { StatusCodes } = require("http-status-codes");

function isAuthenticate(req, res, next) {
  if (!req.headers.authorization) {
    const HttpStatus = StatusCodes.UNAUTHORIZED
    return res.status(HttpStatus).json(AuthResponse(HttpStatus,"Unauthorized"));
  }

  const splitToken = req.headers.authorization.split(" ");
  if (splitToken.length !== 2 || splitToken[0] !== "Bearer") {
    const HttpStatus = StatusCodes.BAD_REQUEST
    return res.status(HttpStatus).json(AuthResponse(HttpStatus,"Wrong authorization format"));
  }

  jwt.verify(
    splitToken[1],
    "secret",
    { algorithms: ["HS256"] },
    async (err, payload) => {
    const HttpStatus = StatusCodes.UNAUTHORIZED
      if (err && err.name === "TokenExpiredError") {
        res.status(HttpStatus).json(AuthResponse(HttpStatus,"Expired Token"));
      } else if (err) {
        res.status(HttpStatus).json(AuthResponse(HttpStatus,"Invalid Token"));
      } else {
        next();
      }
    }
  );
}

module.exports = {
  isAuthenticate,
};
