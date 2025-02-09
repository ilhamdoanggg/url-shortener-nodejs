const sendResponse = (res, statusCode, success, message, data = null, errorCode = null) => {
    const response = { success, message };
    
    if (data) response.data = data;
    if (errorCode) response.errorCode = errorCode;
  
    return res.status(statusCode).json(response);
  };
  
  module.exports = sendResponse;
