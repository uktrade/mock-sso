const introspect = (scope, username, emailUserId) => {
  return function (req, res, next) {
    if (!scope) {
      return next(Error('Please provide scope'))
    }

    const response = {
      scope,
      active: true,
      exp: 2524608000,
      username,
      email_user_id: emailUserId,
    }

    return res.status(200).send(response)
  }
}

module.exports = introspect
