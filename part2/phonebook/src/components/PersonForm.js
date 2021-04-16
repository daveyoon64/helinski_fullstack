import React from 'react';

const PersonForm = ({name, nameHandler, number, numberHandler, addHandler}) => {
  return (
    <form> 
      <NewContact name={name} nameHandler={nameHandler} 
        number={number} numberHandler={numberHandler}/>
      <div><button onClick={addHandler}>add</button></div>
    </form>
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

export default PersonForm;