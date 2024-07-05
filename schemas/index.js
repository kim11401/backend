const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = () => {
  mongoose.connect(process.env.DB).catch((err) => console.log(err))
}

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err)
})

module.exports = connectDB
