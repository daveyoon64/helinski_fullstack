import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

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
      <Filter searchValue={searchValue} linkHandler={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm 
        name={newName}
        nameHandler={handleNewName}
        number={newNumber}
        numberHandler={handleNewNumber}
        addHandler={handleAdd}/>
      <h2>Numbers</h2>
      <Persons list={contactList}/>
    </div>
  )
}

export default App