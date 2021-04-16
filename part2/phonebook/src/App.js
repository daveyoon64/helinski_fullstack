import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('000-0000000')

  const handleAdd = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      };
      setPersons(persons.concat(newContact));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>name: <input value={newName} onChange={handleNewName}/></div>
        <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
        <div><button onClick={handleAdd}>add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <div key={person.id}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App