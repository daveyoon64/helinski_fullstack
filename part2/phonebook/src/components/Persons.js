import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Persons = ({list}) => {
  return (
    <div key={uuidv4()}>
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