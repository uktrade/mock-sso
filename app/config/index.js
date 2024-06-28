const config = {
  port: process.env.MOCK_SSO_PORT || 8080,
  scope: process.env.MOCK_SSO_SCOPE,
  username: process.env.MOCK_SSO_USERNAME,
  userEmail: process.env.MOCK_SSO_USER_EMAIL,
  userContactEmail: process.env.MOCK_SSO_USER_CONTACT_EMAIL,
  emailUserId: process.env.MOCK_SSO_EMAIL_USER_ID,
  token: process.env.MOCK_SSO_TOKEN,
  validateToken: process.env.MOCK_SSO_VALIDATE_TOKEN,
  code: process.env.MOCK_SSO_CODE,
}

module.exports = config
