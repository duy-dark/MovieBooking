const resFail = require('../response/res-fail')
module.exports = (err, req, res, next) => {
  // const status = err.status
  return res.json(resFail(err.errCode))
}