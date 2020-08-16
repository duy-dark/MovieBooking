const express = require("express")
const express = require("express")
const handler = require("./handler")
const router = express.Router()

router.get("/", handler.login)

module.exports = router
// viết define url api tại đây