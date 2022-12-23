const Joi = require("joi");

const MerchantValidator = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(10).email().required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().required(),
  phone_number: Joi.number().required()
});

const ProductValidator = Joi.object().keys({
  merchantId: Joi.number(),
  name: Joi.string().min(5).max(50).required(),
  quantity: Joi.number().min(1).required(),
  price: Joi.number().min(10000).required(),
});

module.exports = {
  MerchantValidator,
  ProductValidator,
}