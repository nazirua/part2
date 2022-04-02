import React from 'react';
import { useState, useEffect} from 'react';
import Person from './components/Person';
import noteService from './services/persons';



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



const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('') 
  const [query, setQuery] = useState('') 

  useEffect(() => {
    noteService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])



  const addPerson = (event) => {
    event.preventDefault()
    // if (persons.find((p) => p.name === newName && p.number === newNumber)) {
    //   window.alert(`${newName} is already added to the phonebook`);
    //   return false;
    // }else if(persons.find((p) => p.number === newNumber)){
    //   window.alert(`${newNumber} is already registered`);
    //   return false;
    // }

    const personObject = {
      name: newName, number: newNumber
    }
  
    noteService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleDeleteOf = (id) => {
      const person = persons.filter(p => p.id !== id)
      const changedNote = { ...persons}

    if(window.confirm(`Delete  ?`)){
      console.log(person)
      noteService
        .delete(id, changedNote)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person: response.data))
        })
    }
   
}

const updateNumber = id => {
  if (persons.find((p) => p.name === newName && p.number === newNumber)) {
    window.alert(`${newName} is already added to the phonebook, replace the old number with new one`);
    return false;
  }else if(persons.find((p) => p.number !== newNumber)){
    const person = persons.find(p => p.id === id)
  const changedNote = { ...person, number: newNumber }

  noteService
    .update(id, changedNote)
    .then(response => {
      setPersons(persons.map(p => p.id !== id ? p : response.data))
    })
    return false;
  }
  
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
      updateNumber={updateNumber}
      addPerson={addPerson}
      newName={newName}
      newNumber={newNumber} 
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      /> 
      <h3>Numbers</h3>
      <div>
        {filteredItems.map(person =>
          <Person 
          key={person.id}
          person={person} 
          handleDelete = {()=>handleDeleteOf(person.id)}
        
          />
        )}

      </div>
      
     
    </div>
  )
}


export default App;
