const config = {
  port: process.env.MOCK_SSO_PORT || 8080,
  scope: process.env.MOCK_SSO_SCOPE,
  username: process.env.MOCK_SSO_USERNAME,
}

module.exports = config
