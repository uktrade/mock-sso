const querystring = require('querystring')

const authorize = (externalCode) => {
  return function (req, res, next) {
    const { redirect_uri: redirectUri, state, code } = req.query
    const redirectCode = code || externalCode

    if (!redirectCode) {
      return next(Error('Please provide code via param or environment variable'))
    }

    if (redirectUri && state) {
      return res.redirect(`${redirectUri}?${querystring.stringify({ state, code:redirectCode })}`)
    }

    return next(Error('Please provide redirect_uri and state params'))
  }
}

module.exports = authorize
