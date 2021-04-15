import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0});

  const handleClick = () => {
    let number = Math.floor(Math.random() * (anecdotes.length - 1));
    setSelected(number);
  }

  const handleVote = () => {
    const votes_copy = {...votes};
    votes_copy[selected] += 1;
    setVotes(votes_copy);
  }

  return (
    <div>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <Button name="vote"
        linkHandler={handleVote} />
      <Button name="next anecdote" 
        linkHandler={handleClick} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.linkHandler}>{props.name}</button>
  )
} 

export default App