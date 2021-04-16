import React from 'react';

const Persons = ({list}) => {
  return (
    <div>
      {list.map((person) => <Contact key={person.id} name={person.name} number={person.number}/>)}
    </div>
    
  )
}

const Contact = ({name, number}) => {
  return (
    <div>{name} {number}</div>
  )
}

export default Persons;