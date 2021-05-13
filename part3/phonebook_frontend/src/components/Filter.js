import React from 'react';

const Filter = ({searchValue, linkHandler}) => {
  return (
    <form>
      <div>filter shown with 
        <input value={searchValue} onChange={linkHandler}></input>
      </div>
    </form>
  )
}

export default Filter;