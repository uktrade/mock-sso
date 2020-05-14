const express = require('express')
const morgan = require('morgan')

const { port, scope, username, emailUserId, token, validateToken } = require('./config')

const oAuthAuthorize = require('./oauth/authorize')
const oAuthToken = require('./oauth/token')
const oAuthIntrospect = require('./oauth/introspect')
const oAuthGetUserDetails = require('./oauth/user')
const parseFormData = require('./form-data/parse')
const ping = require('./healthcheck/ping')
const userApi = require('./api/user')
const catchAllErrors = require('./errors/catch-all')

const app = express()
app.use(morgan('dev'))

app.get('/o/authorize', oAuthAuthorize())
app.post('/o/token', parseFormData(), oAuthToken())
app.post('/o/introspect', oAuthIntrospect(scope, username, emailUserId))
app.get('/api/v1/user/me', oAuthGetUserDetails(token, validateToken === 'true'))
app.get('/healthcheck', ping)
app.get('/api/v1/user/search/', userApi.search)
app.get('/api/v1/user/introspect/', userApi.introspect)

app.use(catchAllErrors())

const server = app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

module.exports = server
