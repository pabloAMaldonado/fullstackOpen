import React, { useState } from 'react'

const Average = ({info}) => {
  const dif = Math.abs(info.good - info.bad)
  const average = (info.total !== 0) ? dif / info.total : 0
 return (
  <>
    <p>Average - {average}</p>
  </>
 )
}

const Percentage = ({info}) => {
  const { good, neutral, bad, total } = info
  let percentage
  let percent

  const is = () => {
    if (good > bad) {
      percentage = 'Positive'
      percent = (100 / total) * good
    }
    if (good === bad) {
      percentage = 'Even'
      percent = (100 / total) * good
    }
    if (good < bad) {
      percentage = 'Negativa'
      percent = (100 / total) * bad
    }
  }

  is()

  return (
    <>
    <p>{percentage} {percent} %</p>
    </>
  )
}

const StatisticsLine = ({ text, value }) => {

  return <p>{text}: {value}</p>
}

const Info = ({ info }) => {
  return (
    <div>
      <h1>Statistics</h1>
      <StatisticsLine text='Good' value={info.good} />
      <StatisticsLine text='Bad' value={info.bad} />
      <StatisticsLine text='Neutral' value={info.neutral} />
    </div>
  )
}

const Statistics = ({info}) => {
  const { total } = info

  if (total !== 0) {
    return (
      <>
        <Info info={info} />
        <p>Total: {total}</p>
        <br />
        <Average info={info} />
        <br />
        <Percentage info={info} />
      </>
    )
  }
  return (
    <>
    <p>No feedback given</p>
    </>
  )
}

const Button = ({ setState, state, value }) => {
  const stateChanger = () => {
    setState[0](state[0] + 1)
    setState[1](state[1] + 1)
  }

  return <button onClick={stateChanger}>{value}</button>
}

function App() {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [total, setTotal] = useState(0)

  const states = {
    good,
    bad,
    neutral,
    total
  }

  return (
    <div>
      <p>Give Feedback</p>
      <Button setState={[setGood, setTotal]} state={[good, total]} value='Good' />
      <Button setState={[setBad, setTotal]} state={[bad, total]} value='Bad' />
      <Button setState={[setNeutral, setTotal]} state={[neutral, total]} value='Neutral' />
      <br />
      <Statistics info={states} />
    </div>
  )
}
export default App
