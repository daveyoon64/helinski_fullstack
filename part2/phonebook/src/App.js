import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchValue, setSearchValue ] = useState('');
  const [ isSearching, setIsSearching ] = useState(false);

  useEffect(() => {
    phonebookService
      .getAll()
      .then(entries => {
        setPersons(entries)
      })
  }, [])

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
      
      phonebookService
        .addPerson(newContact)
        .then(response => {
          setPersons(persons.concat(newContact))
          setNewName('')
          setNewNumber('')
        })
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