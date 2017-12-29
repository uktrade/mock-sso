const querystring = require('querystring')
const { get } = require('lodash')

const authorize = () => {
  return function (req, res, next) {
    const { redirect_uri: redirectUri, state, code } = get(req, 'query')

    if (redirectUri && state && code) {
      return res.redirect(`${redirectUri}?${querystring.stringify({ state, code })}`)
    }

    return next(Error('Please provide redirect_uri, state and code params'))
  }
}

module.exports = authorize
