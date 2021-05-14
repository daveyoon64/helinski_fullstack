const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
} 

const password = process.argv[2]
const new_person = process.argv[3]
const new_number = process.argv[4]
const url =
  `mongodb+srv://daveyoon64:${password}@cluster0.09izg.mongodb.net/personsDb?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .catch(error => {
    console.log(`error connecting to mongoose: ${error}`)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

const Person = mongoose.model('Person', personSchema)

// helper functions
const generateRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

if (process.argv.length === 3) {
  Person
    .find({})
    .then(result => {
      console.log(`phonebook:`)
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
    .catch(error => console.log('error', error))
} else {
  const person = new Person({
    name: new_person,
    number: new_number,
    id: generateRandomInt(1, 10000000)
  })

  person
    .save()
    .then(result => {
      console.log(`added ${new_person} number ${new_number} to phonebook`)
      mongoose.connection.close()
    })
    .catch(error => console.log('error', error))
}