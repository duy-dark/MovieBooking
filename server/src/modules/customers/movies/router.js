const express = require("express")
const handler = require("./handler")
const router = express.Router()

router.get('/', (req, res, next) => {
  res.json('ok')
})

module.exports = router
// viết define url api tại đây