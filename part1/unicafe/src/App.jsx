import { useState } from 'react'

const Button = (feedback) => {
  return (
  <button onClick = {feedback.onClick}>
     {feedback.text} 
  </button>
  )
}

const Display = ({text, amount}) => {

  return(
    <>
      <tr>
        <td>{text}</td>
        <td>{amount}</td>
      </tr>
    </>
  )
}

const Statistics = ({good, bad, neutral}) => {

  if((good + neutral + bad)==0){
    return(
      <>
        <p>No Feedback given</p>
      </>
    )
  }

  return (
    <table>
      <Display text="good" amount={good}/>
      <Display text="neutral" amount={neutral}/>
      <Display text="bad" amount={bad}/>
      <Display text="total" amount={good + neutral + bad}/>
      <Display text="average" amount={(good - bad)/(good + neutral + bad)}/>
      <Display text="positive" amount={(100*good/(good + neutral + bad))+"%"}/>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = newValue => {
    console.log('good amount now', newValue)
    setGood(newValue)
  }

  const badHandler = newValue => {
    console.log('bad amount now', newValue)
    setBad(newValue)
  }

  const neutralHandler = newValue => {
    console.log('neutral amount now', newValue)
    setNeutral(newValue)
  }

//<p><Button onClick={setGood(1)} text = "good"/></p>
  return (
    <div>
      <h1>Give feedback</h1>
      <p>
        <Button onClick={() => goodHandler(good + 1)} text = "good"/>
        <Button onClick={() => neutralHandler(neutral + 1)} text = "neutral"/>
        <Button onClick={() => badHandler(bad + 1)} text = "bad"/>
      </p>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App