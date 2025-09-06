const express = require('express')
const tourController = require('../controllers/tourController')

const tourRouter = express.Router()

tourRouter.param('id', (req, res, next, val) => {
  console.log(`Tour id is: ${val}`)
  next()
})

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour)
tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)

module.exports = tourRouter
