const data = require('./user-list')

function findUserByProp (prop, value) {
  return (user) => user[ prop ] === value
}

module.exports = {
  search: (req, res) => {
    const text = req.query.autocomplete
    let users

    if (text) {
      users = data.filter(({ first_name: fname, last_name: lname }) => (fname.includes(text) || lname.includes(text)))
    } else {
      users = data
    }

    res.json({
      count: users.length,
      results: users,
    })
  },
  introspect: (req, res) => {
    const uuid = req.query.user_id
    const email = req.query.email
    const args = (uuid ? ['user_id', uuid] : ['email', email])
    const user = data.find(findUserByProp(...args))

    if (user) {
      res.json(user)
    } else {
      res.status(404).end()
    }
  },
}
