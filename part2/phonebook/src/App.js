import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

import { v4 as uuidv4 } from 'uuid';

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
        id: uuidv4()
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

  const handleDelete = (event) => {
    const name = event.target.parentNode.childNodes[0].data
    const id = event.target.parentNode.id
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .deletePerson(id)
        .then(status => {
          const persons_copy = [...persons]
          persons_copy.splice(persons_copy.findIndex(person => person.id === id), 1)
          setPersons(persons_copy)
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
      <Persons list={contactList} handleDelete={handleDelete}/>
    </div>
  )
}

export default App