import React, { useState } from 'react'

const ButtonRandom = ({setState, array}) => {
  const length = array.length

  const randomizer = () => {
    let num = Math.floor(Math.random() * (length))
    console.log(num)

    setState(num)
  }

  return <button onClick={randomizer}>Next anecdote</button>
}

const VoteButton = ({setState, state, index}) => {
  const array = [...state]

  const updateState = () => {
    array[index] += 1

    setState(array)
  }
  return (
    <>
      <p>Has {array[index]} votes</p>
      <button onClick={updateState}>Vote</button>
    </>
  )
}

const MostVoted = ({ strings, votes }) => {
  const mostVotedIndex = votes.indexOf(Math.max(...votes))

  return (
    <>
      <h1>Most voted</h1>
      <p>{strings[mostVotedIndex]}</p>
      <p>Has {votes[mostVotedIndex]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <VoteButton setState={setVotes} state={votes} index={selected}/>
      <ButtonRandom setState={setSelected} array={anecdotes} />
      <br />
      <br />
      <MostVoted strings={anecdotes} votes={votes} />
    </div>
  )
}

export default App
