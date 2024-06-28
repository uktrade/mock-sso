const bearerPrefix = 'Bearer '

function invalidRequest (res, error) {
  console.log('Invalid request: ' + error)
  return res.status(400).json({ error: 'invalid_request' })
}

const user = (configToken, userEmail, userContactEmail, validateToken) => {
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

    if (header.includes('lepStaffToken')) {
      const response = {
        'email': 'LEP.STAFF@email.com',
        'contact_email': 'LEP.STAFF@contact-email.com',
        'email_user_id': 'LEP.STAFF-20a0353f@id.mock-sso',
        'user_id': '20a0353f-a7d1-4851-9af8-1bcaff152b61',
        'first_name': 'LEP',
        'last_name': 'STAFF',
        'related_emails': [],
        'groups': [],
        'permitted_applications': [{ key: 'datahub-crm' }],
        'access_profiles': [],
      }

      return res.status(200).send(response)
    }

    const response = {
      'email': userEmail || 'vyvyan.holland@email.com',
      'contact_email': userContactEmail || 'vyvyan.holland@contact-email.com',
      'email_user_id': 'vyvyan.holland-20a0353f@id.mock-sso',
      'user_id': '20a0353f-a7d1-4851-9af8-1bcaff152b60',
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
