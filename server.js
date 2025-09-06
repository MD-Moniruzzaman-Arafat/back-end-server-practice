const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')
const PORT = process.env.PORT || 3000

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log('DB connection error:', err))

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
})

const Tour = mongoose.model('Tour', tourSchema)

const testTour = new Tour({
  name: 'Forest Hiker',
  rating: 4.7,
  price: 497,
})

testTour
  .save()
  .then((doc) => {
    console.log(doc)
  })
  .catch((err) => {
    console.log('Error:', err)
  })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
