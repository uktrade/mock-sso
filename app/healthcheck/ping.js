const ping = function (req, res, next) {
  return res.status(200).send('OK')
}

module.exports = ping
