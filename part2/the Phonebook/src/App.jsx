import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    const personObject = {name: newName}

    if(persons.find(person => person.name === personObject.name) !== undefined){
      //Template literals (Template strings)
      window.alert(`${personObject.name} is already added to phonebook`)
      console.log("same name in list")
    }else{
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addContact}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map( person => <li key={person.name}>{person.name}</li>)}
      </ul> 
    </div>
  )
}

export default App