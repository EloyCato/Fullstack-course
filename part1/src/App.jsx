import { useState } from 'react'

  const Hello = (props) => {
    console.log(props)
    return (
      <div>
        <p>Hello {props.name}, you are {props.age} years old </p>
      </div>
    )
  }


  const App = () => {
    const name = 'pedro'
    const age = 10
    return (
      <>
        <h1>Greetings</h1>
        <Hello name ='alacazan' age={2+1} />
        <Hello name ={name} age={age} />
        <Hello name ='nada' />
      </>
    )
  }

export default App
