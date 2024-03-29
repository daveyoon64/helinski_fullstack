require('dotenv').config()

const { request, response } = require('express');
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

logger.token('payload', function (req, res) { return JSON.stringify({name: req.body.name, number: req.body.number}) })
app.use(logger(':method :url :status :res[content-length] - :response-time ms :payload', {
  skip: function(req, res) { return !req.body.name || !req.body.number }
}))
app.use(logger('tiny', {
  skip: function(req, res) { return req.body.name || req.body.number }
}))

let persons = [
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 65478765
    },
    {
      "name": "Rickard James",
      "number": "12412412-231",
      "id": 34523
    },
    {
      "name": "Sinclair O-Reilly",
      "number": "543-234-1345",
      "id": 6456453
    },
    {
      "name": "Pupae are icky",
      "number": "323421342143",
      "id": 918238
    },
    {
      "name": "Jimmy Smits",
      "number": "777-11111",
      "id": 12351
    },
    {
      "name": "Rick Smits",
      "number": "123-234-5431",
      "id": 6756345
    }
];

app.get('/api/persons', (request, response) => {
  Person.find({}).then( people => {
    response.json(people)
  })
  .catch(error => console.log('error', error))
})

app.get('/api/persons/:id', (request, response) => {
  // const id = Number(request.params.id)
  // const person = persons.find((person) => person.id === id )

  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => {
      console.log('Person not found', error)
      response.status(404).end()  
    })

  // if (person) {
  //   response.json(person)
  // } else {
  //   response.status(404).end()
  // }
})

app.get('/info', (request, response) => {
  const date = Date.now()
  response.send(`Phonebook has info for ${persons.length} people <br/><br/> ${new Date().toString()}` )
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  const newId = generateRandomInt(1, 10000000)

  const person = new Person({
      name: body.name,
      number: body.number,
      id: newId
  })
  person.save().then(newPerson => {
    res.json(newPerson)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})