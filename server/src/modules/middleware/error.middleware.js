const resFail = require('../response/res-fail')
module.exports = (err, req, res, next) => {
  return res.status(err.status).json(resFail(err.errCode, err.detail))
}