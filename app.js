const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const app = express()
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

// 1) Middleware
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
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
