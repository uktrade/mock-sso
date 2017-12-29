const introspect = (scope) => {
  return function (req, res, next) {
    return res.status(200).send({
      active: true,
      exp: 1000000000,
      scope,
    })
  }
}

module.exports = introspect
