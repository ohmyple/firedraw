const express = require('express')
const router = express.Router()

// logout here
router.post('/', (req, res, next) => {
  req.logout()  // can use req.session.destroy
  res.send('logged out, send to login')
})

module.exports = router;