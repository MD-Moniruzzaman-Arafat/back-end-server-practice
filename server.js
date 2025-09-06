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

// const testTour = new Tour({
//   name: 'Forest Hiker',
//   rating: 4.7,
//   price: 497,
// })

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc)
//   })
//   .catch((err) => {
//     console.log('Error:', err)
//   })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
