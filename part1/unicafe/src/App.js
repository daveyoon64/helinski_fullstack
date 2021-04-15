import React, { useState, useEffect } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [isFeedbackAvail, setIsFeedbackAvail] = useState(false);

  const handleClick = (name) => {
    switch (name) {
      case 'good': return () => setGood(good + 1)
      case 'neutral': return () => setNeutral(neutral + 1)
      case 'bad': return () => setBad(bad + 1)
      default: return
    };
  }

  useEffect(() => {
    if (good === 0 && neutral === 0 && bad === 0) {
      setIsFeedbackAvail(false);
    } else {
      setIsFeedbackAvail(true);
    }
  }, [good, neutral, bad])

  return (
    <div id="App">
      <div id="feedback-form">
      <h1>give feedback</h1>
      <Button name="good" linkHandler={handleClick} />
      <Button name="neutral" linkHandler={handleClick}/>
      <Button name="bad" linkHandler={handleClick}/>
      </div>
      
      <div id="stat-list">
        <h1>statistics</h1>
        {isFeedbackAvail 
          ? <Statistics good={good} neutral={neutral} bad={bad} />
          : <div> No feedback given</div> }
       </div>
    </div>
    )
}

// Note: the calculations in the props passed to display makes sense
// because we need a way to display a total, but because I don't 
// know of useEffect, I can't useState() for total. The good thing is
// I don't really need to keep track of it, so a temp. calculation
// is more than enough. 
const Statistics = ({good, neutral, bad}) => {
  const sum = () => [good, neutral, bad].reduce((a, b) => a + b, 0);
  const avg = () => isNaN(good / sum()) ? 0 : (good - bad) / sum();
  const positivePct = () => {
    return isNaN(good / sum()) 
      ? 0 
      : `${(good / sum()) * 100}%`;
  }

  return (
    <table id="statistics">
      <tbody>
        <Statistic text="good" total={good} />
        <Statistic text="neutral" total={neutral} />
        <Statistic text="bad" total={bad} />
        <Statistic text="all" total={sum()} />
        <Statistic text="average" total={avg()} />
        <Statistic text="positive" total={positivePct()} />
      </tbody>
    </table>
  )
}

const Button = (props) => {
  return (
    <button 
      onClick={props.linkHandler(props.name)}>{props.name}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.total}</td>
    </tr>
  )
}

export default App