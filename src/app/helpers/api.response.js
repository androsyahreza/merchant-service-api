const LoginSuccessResponse = (httpStatus, message, data) => {
  return {
    status: httpStatus,
    message: message,
    access_token: data,
  };
};

const SuccessResponse = (httpStatus, message, data) => {
  return {
    status: httpStatus,
    message: message,
    data,
  };
};

const FailedResponse = (httpStatus, message) => {
  return ({
    status: httpStatus,
    message,
    data: null,
  })
};

const AuthResponse = (httpStatus, message) => {
  return ({
    status: httpStatus,
    message,
  })
};




module.exports = {
  LoginSuccessResponse,
  SuccessResponse,
  FailedResponse,
  AuthResponse,
}