const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./schemas')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')
require('express-async-errors')
const cors = require('cors')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//데이터베이스 연결
connectDB()

// CORS 설정
app.use(
  cors({
    origin: '*'
  })
)

//미들웨어 설정
app.use(express.json())

//라우터 설정
app.use('/api', router)

//에러 핸들링 미들웨어
app.use(errorHandler)
//서버 실행
app.listen(PORT, () => {
  console.log(PORT, '서버가 실행되었습니다.')
})

module.exports = app
