
const token = () => {
  return function (req, res, next) {
    const { code } = req.fields

    if (code) {
      return res.status(200).send({
        access_token: code,
        token_type: 'Bearer',
      })
    }

    return next(Error('Please provide code param'))
  }
}

module.exports = token
