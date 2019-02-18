const { pickBy } = require('lodash')

const user = (token) => {
  return function (req, res, next) {
    if (!token) {
      return next(Error('Please provide token'))
    }

    const response = pickBy({
      'email': 'vyvyan.holland@email.com',
      'user_id': 123,
      'first_name': 'Vyvyan',
      'last_name': 'Holland',
      'related_emails': [],
      'groups': [],
      'permitted_applications': [
        {
          'key': 'datahub-crm',
        },
        {
          'key': 'datahub-mi',
        },
      ],
      'access_profiles': [],
    })

    return res.status(200).send(response)
  }
}

module.exports = user
