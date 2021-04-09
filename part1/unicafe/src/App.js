import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (name) => {
    switch (name) {
      case 'good': return () => setGood(good + 1)
      case 'neutral': return () => setNeutral(neutral + 1)
      case 'bad': return () => setBad(bad + 1)
      default: return
    }
  }

  return (
    <div id="App">
      <div id="feedback-form">
      <h1>give feedback</h1>
      <Button name="good" linkHandler={handleClick} />
      <Button name="neutral" linkHandler={handleClick} />
      <Button name="bad" linkHandler={handleClick} />
      </div>
      <div id="stat-list">
        <h1>statistics</h1>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
      </div>
      
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.linkHandler(props.name)}>{props.name}</button>
  )
}

export default App