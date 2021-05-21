const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to mongodb')
  })
  .catch(error => {
    console.log('Error connecting to mongodb', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

  // import mongoose
  // get the URI to connect o mongo via dotenv
  // log some useful info
  // connect to mongo
  // create the schema
  // delete the unneccessary property __id and and turn object to string
  // use module exports