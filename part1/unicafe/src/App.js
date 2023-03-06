import { useState } from 'react'

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
   );
}

//round to 2 decimal points
const roundToTwo = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

const StatisticLine = ({ text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
   );
}

const Statistics = ({ good, neutral, bad}) => {
  const all = good + bad + neutral
  const average = all > 0 ? roundToTwo((good - bad) / all) : 0
  const positive = all > 0 ? roundToTwo((good / all) * 100) : 0;

  if (all === 0) {
    return <p>No feedback given</p>
  } else {
  return (
  <table>
    <tbody>
    <StatisticLine text = "good" value = {good} />
    <StatisticLine text = "neutral" value = {neutral} />
    <StatisticLine text = "bad" value = {bad} />
    <StatisticLine text="all" value={all} />
    <StatisticLine text="average" value={average} />
    <StatisticLine text="positive" value={positive + " %"} />
    </tbody>
  </table>
   );
  }
}

const App = () => {
  // save click of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text = 'good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text = 'neutral' />
        <Button handleClick={() => setBad(bad + 1)} text = 'bad' />
        <h1>statistics</h1>
        <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </>
  )
}

export default App