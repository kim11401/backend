const express = require('express')
const { createUser, loginUser } = require('../controllers/userController')
const router = express.Router()

// 사용자 생성 라우터
router.post('/create', createUser)

// 사용자 로그인 라우터
router.post('/login', loginUser)

module.exports = router
