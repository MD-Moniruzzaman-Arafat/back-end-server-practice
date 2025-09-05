const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 3000

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`))
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Server is Running....' })
})

// 2) Route Handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })
}

const getTour = (req, res) => {
  console.log(req.requestTime)
  const tour = tours.find((t) => t._id === req.params.id)
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    })
  }
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  })
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1]._id + 1
  const newTour = Object.assign({ id: newId }, req.body)
  tours.push(newTour)
  fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    })
  })
}

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      data: '<Updated tour here...>',
    },
  })
}

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  })
}

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  })
}

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  })
}

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

// 3) Routes

//  route create
const tourRouter = express.Router()
const userRouter = express.Router()

// route define
tourRouter.route('/').get(getAllTours).post(createTour)
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

// route mounting
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// 4) Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
