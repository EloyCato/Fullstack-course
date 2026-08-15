import { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = ({addContact, newName, newNumber,handleNameChange,handleNumberChange}) => {

  return(
  <>
    <h2>Add new</h2>
    <form onSubmit = {addContact}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
  )
}

const Filter = ({findName, handleFindChange}) => {
  return (
    <div>
        filter shown with: 
        <input value = {findName} onChange={handleFindChange}/>
    </div>
  )
}

const Numbers = ({ persons, findName }) => {

    if(findName === ''){
      return persons.map( person => <li key={person.id}>{person.name} {person.number}</li>)
    }
    return persons.filter(person => person.name.toLowerCase().includes(findName)).map( person => <li key={person.name}>{person.name} {person.number}</li>)
}

const DisplayNumbers = ({persons, findName}) => {

  return (
    <>
    <h2>Numbers</h2>
    <ul>
      <Numbers persons={persons} findName={findName}/>
    </ul>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [findName, setFindName] = useState('')

 const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }
  useEffect(hook, [])
  console.log('render',persons.length, 'people')  

  const addContact = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber, id: persons.length +1}

    if(persons.find(person => person.name === personObject.name) !== undefined){
      //Template literals (Template strings)
      window.alert(`${personObject.name} is already added to phonebook`)
      console.log("same name in list")
    }else{
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFindChange = (event) =>{
    setFindName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter findName={findName} handleFindChange={handleFindChange}/>
      <PersonForm addContact = {addContact} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange={handleNumberChange}/>
      <DisplayNumbers persons={persons} findName={findName}/>
    </div>
  )
}

export default App