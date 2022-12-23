const { SuccessResponse, FailedResponse } = require("../helpers/api.response")
const { MerchantValidator } = require("../validators/validator")
const { StatusCodes } = require("http-status-codes");
const { Merchant, Product } = require("../../models/index");

const getMerchant = async (req, res) => {
  try  {
    const data = await Merchant.findAll();
    const HttpStatus = StatusCodes.OK;
    res.status(HttpStatus).json(SuccessResponse(HttpStatus, null, data));
  } catch (err) {
    const HttpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(HttpStatus).json(FailedResponse(HttpStatus, err));
  }
}

const getMerchantById = async (req, res) => {
  try  {
    const merchantId = req.params.id;
    const data = await Merchant.findOne({where: { id: merchantId }, 
      include: [{ model: Product, required: false }]
    });
    if (data) {
      const HttpStatus = StatusCodes.OK;
      res.status(HttpStatus).json(SuccessResponse(HttpStatus, null, data));
    } else {
      const HttpStatus = StatusCodes.NOT_FOUND;
      res.status(HttpStatus).json(FailedResponse(HttpStatus, `Cannot find merchant with id = ${merchantId}`));
    }
  } catch (err) {
    const HttpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(HttpStatus).json(FailedResponse(HttpStatus, err));
  }
}

const updateMerchant = async (req, res) => {
  try  {
    const merchantId = req.params.id;
    const findMerchant = await Merchant.findOne({where: { id: merchantId }});
    if (findMerchant) {
      const { name, email, password, address, phone_number } = req.body;
      const merchantValidate = MerchantValidator.validate(req.body);
      if(merchantValidate.error){
        const HttpStatus = StatusCodes.BAD_REQUEST;
        res.status(HttpStatus).send(MerchantValidator.validate(req.body).error.details);
      } else {
        const data = await findMerchant.update({
          name: name,
          email: email,
          password: password,
          address: address,
          phone_number: phone_number
        }, { where: {id: merchantId}, individualHooks: true});
        const HttpStatus = StatusCodes.OK;
        res.status(HttpStatus).json(SuccessResponse(HttpStatus, "Merchant successfully updated"));
      }
    } else {
      const HttpStatus = StatusCodes.NOT_FOUND;
      res.status(HttpStatus).json(FailedResponse(HttpStatus, `Cannot find merchant with id = ${merchantId}`));
    }
  } catch (err) {
    const HttpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(HttpStatus).json(FailedResponse(HttpStatus, err));
  }
}

const deleteMerchant = async (req, res) => {
  try  {
    const merchantId = req.params.id;
    const data = await Merchant.destroy({ where: {id : merchantId}});
    if (data == 1) {
      const HttpStatus = StatusCodes.OK;
      res.status(HttpStatus).json(SuccessResponse(HttpStatus, "Merchant successfully deleted"));
    } else {
      const HttpStatus = StatusCodes.NOT_FOUND;
      res.status(HttpStatus).json(FailedResponse(HttpStatus, `Cannot find merchant with id = ${merchantId}`));
    }
  } catch (err) {
    const HttpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(HttpStatus).json(FailedResponse(HttpStatus, err));
  }
}

module.exports = {
  getMerchant,
  getMerchantById,
  updateMerchant,
  deleteMerchant
}