const express = require('express')
const morgan = require('morgan')

const { port, scope, username } = require('./config')

const oAuthAuthorize = require('./oauth/authorize')
const oAuthToken = require('./oauth/token')
const oAuthIntrospect = require('./oauth/introspect')
const parseFormData = require('./form-data/parse')
const ping = require('./healthcheck/ping')
const catchAllErrors = require('./errors/catch-all')

const app = express()
app.use(morgan('dev'))

app.get('/o/authorize', oAuthAuthorize())
app.post('/o/token', parseFormData(), oAuthToken())
app.post('/o/introspect', oAuthIntrospect(scope, username))
app.get('/healthcheck', ping)

app.use(catchAllErrors())

const server = app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

module.exports = server
