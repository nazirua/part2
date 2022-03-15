import React from 'react';
import { useState } from 'react'
import Demo from './Demo';

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '05896905458'}
  ]) 
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('') 

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((p) => p.name === newName && p.number === newNumber)) {
      window.alert(`${newName} is already added to the phonebook`);
      return false;
    }else if(persons.find((p) => p.number === newNumber)){
      window.alert(`${newNumber} is already registered`);
      return false;

    }
    const personObject = {
      name: newName, number: newNumber
    }
  
    setPersons(persons.concat(personObject));
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <Demo />

      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: {' '}
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:{' '}
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>  
      <h2>Numbers</h2>
      {persons.map((person)=> 
        <div key={person}>{person.name} {person.number} </div>
        )}
    </div>
  )
}


export default App;
