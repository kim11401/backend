const sendResponse = (res, success, code, message, data = null) => {
  res.status(code).json({
    success,
    code,
    message,
    data
  })
}

module.exports = sendResponse
