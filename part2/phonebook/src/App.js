import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchValue, setSearchValue ] = useState('');
  const [ isSearching, setIsSearching ] = useState(false);
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ style, setStyle] = useState({})

  const successStyle = {
    color: 'green'
  }

  const errorStyle = {
    color: 'red'
  }

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
    const found_person = persons.find(person => person.name === newName)
    if (found_person) {
      if (window.confirm(`${found_person.name} is already added to phonebook, replace old number with new one?`)) {
        phonebookService
          .updatePerson(found_person, newNumber)
          .then(() => {
            const index = persons.findIndex(item => item.name === found_person.name)
            const persons_copy = [
              ...persons.slice(0, index),
              { ...found_person, number: newNumber },
              ...persons.slice(index + 1)
            ]
            setPersons(persons_copy)
            setSuccessMessage(`Changed ${found_person.name}'s number`)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setSuccessMessage(`Information of ${found_person.name} has already been removed from the server`)
            setStyle(errorStyle)
          })
      }
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
          setSuccessMessage(`Added ${newContact.name}`)
          setStyle(successStyle)
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
      <Notification message={successMessage} style={style}/>
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