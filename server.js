const express = require('express')

const app = express()

require('dotenv').config()

// database
const connectDB = require('./config/connectDB')
connectDB()

//routes

app.use(express.json())

app.use('/api/user', require('./routes/user'))
//app.use

//port

const PORT = process.env.PORT

//server

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`Server is running on port ${PORT} ..`)
)