import React from 'react';
import { useState } from 'react'
// import Demo2 from './Demo2';

const filteredNames = (query, persons) => {
  if(!query){
    return persons
  }
  return persons.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
}


const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('') 
  const [query, setQuery] = useState('') 

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

 
 const filteredItems = filteredNames(query, persons)


  return (
    <div>
      {/* <Demo2 /> */}

      <h2>Phonebook</h2>
      <label > filter shown with:{''}
        <input onChange={e => setQuery(e.target.value)} />
      </label>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: {' '}
          <input 
           type='text'
            value={newName}
            onChange={handleNameChange} required
          />
        </div>
        <div>
          number:{' '}
          <input 
          type='number'
            value={newNumber}
            onChange={handleNumberChange} required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>  
      <h2>Numbers</h2>
      {filteredItems.map((person)=> 
        <div key={person}>{person.name} {person.number} </div>
        )}
    </div>
  )
}


export default App;
