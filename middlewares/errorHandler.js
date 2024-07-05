const sendResponse = require('../util/response')
const errorHandler = (error, req, res, next) => {
  sendResponse(res, false, error.status || 500, error.message)
}

module.exports = errorHandler
