const express = require('express')
const app = express()

const persons = [
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 1
    },
    {
      "name": "Rickard James",
      "number": "12412412-231",
      "id": 2
    },
    {
      "name": "Sinclair O-Reilly",
      "number": "543-234-1345",
      "id": 3
    },
    {
      "name": "Pupae are icky",
      "number": "323421342143",
      "id": 4
    },
    {
      "name": "Jimmy Smits",
      "number": "777-11111",
      "id": 5
    },
    {
      "name": "Rick Smits",
      "number": "123-234-5431",
      "id": 6
    }
];

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id )

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
  
})

app.get('/info', (request, response) => {
  const date = Date.now()
  response.send(`Phonebook has info for ${persons.length} people <br/><br/> ${new Date().toString()}` )
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})