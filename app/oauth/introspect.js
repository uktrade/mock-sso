const { pickBy } = require('lodash')

const introspect = (scope, username) => {
  return function (req, res, next) {
    if (!scope) {
      return next(Error('Please provide scope'))
    }

    const response = pickBy({
      scope,
      active: true,
      exp: 2524608000,
      username,
    })

    return res.status(200).send(response)
  }
}

module.exports = introspect
