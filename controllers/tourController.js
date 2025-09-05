const fs = require('fs')
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`))

// middleware function
exports.checkName = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name field',
    })
  }
  next()
}

// Route Handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })
}

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      data: '<Updated tour here...>',
    },
  })
}

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  })
}
