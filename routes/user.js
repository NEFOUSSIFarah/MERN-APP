const express = require('express')
const { register, login } = require('../controllers/user')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

//register route
router.post('/register', register)

//login route
router.post('./login', login)

//current user
router.get('/current', isAuth, (req, res) => {
  res.send(req.user)
})

module.exports = router