const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// Middleware to parse JSON bodies
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Server is Running....' })
})

// app.post('/', (req, res) => {
//   res.status(200).json({ message: 'Post request received' })
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`))

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })
})

app.post('/api/v1/tours', (req, res) => {
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
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
