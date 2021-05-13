import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Persons = ({list, handleDelete}) => {
  return (
    <div>
      {list.map((person) => {
        return <Contact key={uuidv4()}
                  name={person.name} 
                  number={person.number} 
                  handleDelete={handleDelete}/>
        })
      }
    </div>
  )
}

const Contact = ({name, number, handleDelete}) => {
  return (
    <li className="person-list" onClick={handleDelete}>
      {name} {number} 
      <button>delete</button>
    </li>
    
  )
}

export default Persons;