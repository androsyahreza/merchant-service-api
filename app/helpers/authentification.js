const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const GenerateToken = (name, email) => {
  const payload = { name: name, email: email};
  const token = jwt.sign(payload, "secret");
  return token;
}
const ComparePassword = (password, modelPassword) => {
  const validPassword = bcrypt.compare(password, modelPassword);
  return validPassword;
}
module.exports = {
  GenerateToken,
  ComparePassword
}