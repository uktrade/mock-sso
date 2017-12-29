const { get } = require('lodash')

const token = () => {
  return function (req, res, next) {
    const { code } = get(req, 'fields')

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
