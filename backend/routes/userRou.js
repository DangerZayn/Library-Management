const express = require('express')
const { registerUser, loginUser, loginRecovery, passwordRest } = require('../controllers/userCont')
const router = express.Router()


router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/recovery', loginRecovery)
router.post('/password-reset', passwordRest)


module.exports = router