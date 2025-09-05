const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const app = express()
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

// 1) Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use((req, res, next) => {
  console.log('Hello from the middleware')
  next()
})
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Server is Running....' })
})

// route mounting
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
