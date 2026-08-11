import { useState } from 'react'

const Button = (props) => {

  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Voted = (props) =>{

  return(
    <>
      <p>
        has {props.voting[props.selected]} votes
      </p>
    </>
  )
}

const MostVottedPanel = (props) => {

  return(
    <>
    <h1>
      Anecdote with most votes
    </h1>
    <p>
      {props.anecdotes[props.vottedAnecdote]}
    </p>
    <Voted voting = {props.voting} selected = {props.vottedAnecdote}/>
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
   
  const [selected, setSelected] = useState(0)

  const [voting,setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 })

  const [mostVottedAnecdote,setVottedAnecdote] = useState(0)

  const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - min) + min))

  const selectedHandler = () => {
    const floor = 0
    const ceiling = anecdotes.length
    const index = getRandomInt(floor,ceiling)
    setSelected(index)
  }

  const votesHandler = () => {
    const copy = { ...voting }
    copy[selected] += 1
    setVotes(copy)
    setVottedAnecdote(findMostVotted(voting))
    console.log("most votes handler:",mostVottedAnecdote)
  }
  
  const findMostVotted = () => {

    const size = anecdotes.length
    let mostVotted = 0

    for(let i = 0; i < size; i++){

      if(voting[i]>voting[mostVotted]){

        mostVotted = i
      }
    }

    return mostVotted
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>
        <Button onClick = {votesHandler} text ="vote"/>
        <Button onClick = {selectedHandler} text="next anecdote"/>
      </p>
      <Voted voting = {voting} selected={selected}/>
      <MostVottedPanel anecdotes = {anecdotes} voting = {voting} vottedAnecdote = {mostVottedAnecdote}/>
    </div>
  )
}

export default App