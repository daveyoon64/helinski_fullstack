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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})