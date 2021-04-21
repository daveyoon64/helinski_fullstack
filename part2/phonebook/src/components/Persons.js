import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Persons = ({list, handleDelete}) => {
  return (
    <div key={uuidv4()}>
      {list.map((person) => {
        return <Contact key={person.id}
                  id={person.id}
                  name={person.name} 
                  number={person.number} 
                  handleDelete={handleDelete}/>
        })
      }
    </div>
  )
}

const Contact = ({name, number, id, handleDelete}) => {
  return (
    <div id={id} onClick={handleDelete}>
      {name} {number} 
      <button>delete</button>
    </div>
    
  )
}

export default Persons;