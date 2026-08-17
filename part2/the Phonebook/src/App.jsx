import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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

const Numbers = ({ persons, findName, deleteName }) => {

    if(findName === ''){
      return persons.map( person => 
        <li key={person.id}>
          {person.name} {person.number}
          <ActionButton label={'delete'} action={() => deleteName(person.id)}/>
        </li>)
    }
    return persons
            .filter(person => person.name.toLowerCase().includes(findName))
            .map( person => <li key={person.name}>{person.name} {person.number}<ActionButton label={'delete'} action={() => deleteName(person.id)}/></li>)
}

const ActionButton = ({label, action}) => {

  return(
    <>
    <button onClick ={action}>{label}</button>
    </>
  )
}

const DisplayNumbers = ({persons, findName, deleteName}) => {

  return (
    <>
    <h2>Numbers</h2>
    <ul>
      <Numbers persons={persons} findName={findName} deleteName={deleteName}/>
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
  personService
    .getAll()
    .then(initialNames => {
      console.log('promise fulfilled')
      setPersons(initialNames)
    })
  }
  useEffect(hook, [])
  console.log('render',persons.length, 'people')  

  const addContact = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName,
        number: newNumber/*,
        id: persons.length +1*/}

    const personToUpdateNumber = persons.find(person => person.name === personObject.name)
    if(personToUpdateNumber !== undefined){
      //Template literals (Template strings)
      if(window.confirm(`${personObject.name} is already added to phonebook, do you wish do replace the old number with a new one?`)){
        personService.update(personToUpdateNumber.id, personObject)
          .then(returnedPerson => { 
            setPersons(persons.map( person => person.id === personToUpdateNumber.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
        })
        console.log("name updated")
      }else{
        console.log("same name in list")
      }
      
    }else{
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      /*
        setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      */
    }
  }

  const deleteName = (id) => {

    
    const personObject = persons.find(person => person.id === id)
    const indexToBeDeleted = persons.findIndex( (deletingPerson) => deletingPerson === personObject)
    if(window.confirm(`Delete ${personObject.name}?`)){
    personService.remove(id)
      .then(deletedPerson => setPersons(persons.toSpliced(indexToBeDeleted,1)))  
    }
    
  }

  const updateNumber = ({personObject}) =>{

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
      <DisplayNumbers persons={persons} findName={findName} deleteName={deleteName}/>
    </div>
  )
}

export default App