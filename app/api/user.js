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

    res.json(users)
  },
  introspect: (req, res) => {
    const uuid = req.query.user_id
    const email = req.query.email
    const user = data.find(findUserByProp((uuid ? 'user_id' : 'email'), (uuid || email)))

    if (user) {
      res.json(user)
    } else {
      res.status(404).end()
    }
  },
}
