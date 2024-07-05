const User = require('../schemas/user')
const crypto = require('crypto')
const sendResponse = require('../util/response')
const { sign } = require('jsonwebtoken')
const saltRounds = 10

const salt = crypto.randomBytes(16).toString('hex')
const iterations = 10000
const keylen = 64
const digest = 'sha512'

// 해싱 함수
const hashPassword = (password, salt) => {
  return crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString('hex')
}

// 새로운 사용자 생성
const createUser = async (req, res) => {
  try {
    const { userId, password, nickName } = req.body

    // ID 유효성 검사
    const idRegex = /^[a-zA-Z0-9]{1,30}$/
    if (!idRegex.test(userId)) {
      return sendResponse(res, false, 400, 'Invalid user ID format')
    }

    // 패스워드 유효성 검사
    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,100}$/
    if (!passwordRegex.test(password)) {
      return sendResponse(res, false, 400, 'Invalid user ID format')
    }

    // ID 중복 검사
    const existingUser = await User.findOne({ userId })
    if (existingUser) {
      return sendResponse(res, false, 400, 'User ID already exists')
    }

    // 패스워드 암호화
    const hashedPassword = hashPassword(password, salt)

    // 새로운 사용자 생성
    const newUser = new User({
      userId,
      password: hashedPassword,
      nickName,
      salt
    })
    await newUser.save()
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body

    // 사용자 존재 확인
    const user = await User.findOne({ userId })
    if (!user) {
      return sendResponse(res, false, 400, 'Invalid user ID or password')
    }

    // 비밀번호 비교
    const hashedPassword = hashPassword(password, user.salt)
    if (hashedPassword !== user.password) {
      return sendResponse(res, false, 400, 'Invalid user ID or password')
    }

    // JWT 토큰 발급
    const token = sign(
      { userId: user.userId, nickName: user.nickName },
      process.env.JWT_SECRET,
      { expiresIn: '15h' }
    )

    // 로그인 성공 응답
    return sendResponse(res, true, 200, 'Login successful', { token })
  } catch (error) {
    return sendResponse(res, false, 500, error.message)
  }
}

module.exports = { createUser, loginUser }
