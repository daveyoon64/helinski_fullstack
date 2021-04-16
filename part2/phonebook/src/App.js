import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('000-0000000');
  const [ searchValue, setSearchValue ] = useState('');
  const [ isSearching, setIsSearching ] = useState(false);

  const contactList = isSearching
        ? persons.filter(person => person.name.includes(searchValue))
        : persons

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

  const handleFilter = (event) => {
    event.target.value.length === 0
      ? setIsSearching(false)
      : setIsSearching(true);
    setSearchValue(event.target.value);
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
        <div>filter shown with 
          <input value={searchValue} onChange={handleFilter}></input>
        </div>
      </form>
      <h2>Add a new</h2>
      <form> 
          <NewContact name={newName} nameHandler={handleNewName} 
            number={newNumber} numberHandler={handleNewNumber}/>
        <div><button onClick={handleAdd}>add</button></div>
      </form>
      <h2>Numbers</h2>
      {contactList.map((person) => <Contact key={person.id} name={person.name} number={person.number}/>)}
    </div>
  )
}

const Contact = ({name, number}) => {
  return (
    <div>{name} {number}</div>
  )
}

const NewContact = ({name, number, nameHandler, numberHandler}) => {
  return (
    <div>
      <div>name: <input value={name} onChange={nameHandler}/></div>
      <div>number: <input value={number} onChange={numberHandler}/></div>
    </div>
  )
}

export default App