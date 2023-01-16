const { FailedResponse, SuccessResponse, LoginSuccessResponse } = require("../helpers/api.response");
const { GenerateToken, ComparePassword } = require("../helpers/authentification");
const { MerchantValidator } = require("../validators/validator");
const { StatusCodes } = require("http-status-codes");
const { Merchant } = require("../../database/models/index");

const register = async (req, res) => {
  try {
    const merchantValidate = MerchantValidator.validate(req.body);
    if(merchantValidate.error){
      const HttpStatus = StatusCodes.BAD_REQUEST;
      res.status(HttpStatus).send(MerchantValidator.validate(req.body).error.details);
    } else {
      const { name, email, password, address, phone_number } = req.body;
      if (await Merchant.findOne({where: {email: email}})) {
        const HttpStatus = StatusCodes.BAD_REQUEST;
        res.status(HttpStatus).json(FailedResponse(HttpStatus, "Merchant already registered"));
      } else {
        const data = await Merchant.create({
          name: name,
          email: email,
          password: password,
          address: address,
          phone_number: phone_number
        });
        const HttpStatus = StatusCodes.CREATED;
        res.status(HttpStatus).json(SuccessResponse(HttpStatus, "Merchant successfully registered"));
      }
    }
  } catch (err) {
    const HttpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(HttpStatus).json(FailedResponse(HttpStatus, err));
  }
}

const login = async (req, res) => {
  try  {
    const {email, password} = req.body;
    const data = await Merchant.findOne({where: {email:email}});
    if (!data) {
      const HttpStatus = StatusCodes.NOT_FOUND;
      res.status(HttpStatus).json(FailedResponse(HttpStatus, "Cannot find merchant"))
    } else {
      const token = GenerateToken(data.name, data.email);
      const validPassword = await ComparePassword(password, data.password);
      if (!validPassword) {
        const HttpStatus = StatusCodes.BAD_REQUEST;
        res.status(HttpStatus).json(FailedResponse(HttpStatus, "Invalid Email or Password."));
      } else {
        const HttpStatus = StatusCodes.OK;
        res.status(HttpStatus).json(LoginSuccessResponse(HttpStatus, "User successfully logged in", token));
      }
    }
  } catch (err) {
    const HttpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(HttpStatus).json(FailedResponse(HttpStatus, err));
  }
}


module.exports = {
  register,
  login,
};