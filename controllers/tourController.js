const Tour = require('../models/tourModel')

// Route Handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    // data: {
    //   tours,
    // },
  })
}

exports.getTour = (req, res) => {
  console.log(req.requestTime)
  //   const tour = tours.find((t) => t._id === req.params.id)
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    })
  }
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // data: {
    //   tour,
    // },
  })
}

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }
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
