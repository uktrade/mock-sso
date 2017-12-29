const { assign } = require('lodash')
const formidable = require('formidable')

const parse = () => {
  return function (req, res, next) {
    const form = new formidable.IncomingForm()

    form.parse(req, (error, fields) => {
      if (error) {
        return next(error)
      }

      assign(req, { fields })
      next()
    })
  }
}

module.exports = parse
