const bearerPrefix = 'Bearer '

function invalidRequest (res, error) {
  console.log('Invalid request: ' + error)
  return res.status(400).json({ error: 'invalid_request' })
}

const user = (configToken, validateToken) => {
  return function (req, res, next) {
    if (!configToken) {
      return next(new Error('Please provide configToken'))
    }

    const header = req.headers.authorization

    if (!header) {
      return invalidRequest(res, 'No header')
    }

    const hasBearer = header.startsWith(bearerPrefix)

    if (!hasBearer) {
      return invalidRequest(res, 'No bearerPrefix')
    }

    if (validateToken) {
      const token = header.substring(bearerPrefix.length)

      if (token !== configToken) {
        return invalidRequest(res, `Token does not match`)
      }
    }

    const response = {
      'email': 'vyvyan.holland@email.com',
      'user_id': 123,
      'first_name': 'Vyvyan',
      'last_name': 'Holland',
      'related_emails': [],
      'groups': [],
      'permitted_applications': [
        {
          key: 'datahub-crm',
        },
        {
          key: 'datahub-mi',
        },
        {
          key: 'market-access',
        },
      ],
      'access_profiles': [],
    }

    return res.status(200).send(response)
  }
}

module.exports = user
