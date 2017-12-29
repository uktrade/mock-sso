const catchAll = () => {
  return function (error, req, res, next) {
    const statusCode = error.statusCode || 500

    if (res.headersSent) {
      return next(error)
    }

    return res.status(statusCode)
      .send(error.message)
  }
}

module.exports = catchAll
