import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleAdd = (event) => {
    event.preventDefault();
    console.log('clicked', event)
    const newContact = {
      name: newName,
      id: persons.length + 1
    };
    setPersons(persons.concat(newContact));
    setNewName('');
  }

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <div key={person.id}>{person.name}</div>)}
    </div>
  )
}

export default App