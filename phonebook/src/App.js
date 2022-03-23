import React from 'react';
import { useState, useEffect} from 'react'
import axios from 'axios'



const filteredNames = (query, persons) => {
  if(!query){
    return persons
  }
  return persons.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
} 

const Filter = ({handleQueryChange}) => {
  return(
    <>
      <label > filter shown with:{''}
        <input onChange={handleQueryChange} />
      </label>
    </>
  )
}

const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
return(
  <>
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
        type='text'
          value={newNumber}
          onChange={handleNumberChange} required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
   </form> 
  </>
)
}

const Person = (props) => {
return(
  <>
    {props.filteredItems.map((person, i)=> 
    <div key={i}>{person.name} {person.number} </div>
    )}
  </>
)
}

const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('') 
  const [query, setQuery] = useState('') 

  useEffect(() => {
    console.log('Effects')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('Promise fulfiled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')


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

const filteredItems = filteredNames(query, persons)


  const handleQueryChange = (e) => {
   setQuery(e.target.value)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleQueryChange={handleQueryChange}/>
      <h3>add a new</h3>
      <PersonForm 
      addPerson={addPerson}
      newName={newName}
      newNumber={newNumber} 
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      /> 
      <h3>Numbers</h3>
      <Person filteredItems={filteredItems} />
     
    </div>
  )
}


export default App;
