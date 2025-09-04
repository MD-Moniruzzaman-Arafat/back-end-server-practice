const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
