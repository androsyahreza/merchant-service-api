const { SuccessResponse, FailedResponse } = require("../helpers/api.response")
const { ProductValidator } = require("../validators/validator")
const { StatusCodes } = require("http-status-codes");
const { Product } = require("../../database/models/index")

const addProduct = async (req, res) => {
  try  {
    const productValidate = ProductValidator.validate(req.body);
    if(productValidate.error){
      const HttpStatus = StatusCodes.BAD_REQUEST;
      res.status(HttpStatus).send(productValidate.error.details);
    } else {
      const { merchantId, name, quantity, price} = req.body;
      if (await Product.findOne({where: {name: name}})) {
        const HttpStatus = StatusCodes.BAD_REQUEST;
        res.status(HttpStatus).json(FailedResponse(HttpStatus, "Product already added"));
      } else {
        const data = await Product.create({
          merchantId: merchantId,
          name: name,
          quantity: quantity,
          price: price
        });
        const HttpStatus = StatusCodes.CREATED;
        res.status(HttpStatus).json(SuccessResponse(HttpStatus, "Product successfully added"));
      }
    }
  } catch (err) {
    const HttpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(HttpStatus).json(FailedResponse(HttpStatus, err));
  }
}

const getProduct = async (req, res) => {
  try  {
    const merchantId = req.params.merchantId;
    const data = await Product.findAll({
      where: { merchantId: merchantId },
      // include: [{ model: Product, required: false }]
    });
    if (data != 0) {
      const HttpStatus = StatusCodes.OK;
      res.status(HttpStatus).json(SuccessResponse(HttpStatus, null, data));
    } else {
      const HttpStatus = StatusCodes.NOT_FOUND;
      res.status(HttpStatus).json(FailedResponse(HttpStatus, `Cannot find product with merchant with id = ${merchantId}`));
    }
  } catch (err) {
    const HttpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(HttpStatus).json(FailedResponse(HttpStatus, err));
  }
}

const getProductById = async (req, res) => {
  try  {
    const {merchantId, id} = req.params;
    const data = await Product.findAll({
      where: { merchantId: merchantId, id: id}
    });
    if (data != 0) {
      const HttpStatus = StatusCodes.OK;
      res.status(HttpStatus).json(SuccessResponse(HttpStatus, null, data));
    } else {
      const HttpStatus = StatusCodes.NOT_FOUND;
      res.status(HttpStatus).json(FailedResponse(HttpStatus, `Cannot find product = ${id} with merchant id = ${merchantId}`));
    }
  } catch (err) {
    const HttpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(HttpStatus).json(FailedResponse(HttpStatus, err));
  }
}

const updateProduct = async (req, res) => {
  try  {
    const {merchantId, id} = req.params;
    const findData = await Product.findAll({where: { merchantId: merchantId, id: id}});
    if (findData != 0) {
      const {name, quantity, price} = req.body;
      const productValidate = ProductValidator.validate(req.body);
      if(productValidate.error){
        const HttpStatus = StatusCodes.BAD_REQUEST;
        res.status(HttpStatus).send(productValidate.error.details);
      } else {
        const data = await Product.update({
          merchantId: merchantId,
          name: name,
          quantity: quantity,
          price: price
        }, { where: {id: id} });
        const HttpStatus = StatusCodes.OK;
        res.status(HttpStatus).json(SuccessResponse(HttpStatus, "Product successfully updated"));
      }
    } else {
      const HttpStatus = StatusCodes.NOT_FOUND;
      res.status(HttpStatus).json(FailedResponse(HttpStatus, `Cannot find product ${id} with merchant id = ${merchantId}`));
    }
  } catch (err) {
    const HttpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(HttpStatus).json(FailedResponse(HttpStatus, err));
  }
}
const deleteProduct = async (req, res) => {
  try  {
    const {merchantId, id} = req.params;
    const data = await Product.destroy({where: { merchantId: merchantId, id: id}});
    if (data == 1) {
      const HttpStatus = StatusCodes.OK;
      res.status(HttpStatus).json(SuccessResponse(HttpStatus, "Product successfully deleted"));
    } else {
      const HttpStatus = StatusCodes.NOT_FOUND;
      res.status(HttpStatus).json(FailedResponse(HttpStatus, `Cannot find product ${id} with merchant id = ${merchantId}`));
    }
  } catch (err) {
    const HttpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(HttpStatus).json(FailedResponse(HttpStatus, err));
  }
}
module.exports = {
  addProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
}
