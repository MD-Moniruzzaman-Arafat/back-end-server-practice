const express = require('express')
const fs = require('fs')
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`))

// Route Handlers
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

const tourRouter = express.Router()

tourRouter.route('/').get(getAllTours).post(createTour)
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = tourRouter
