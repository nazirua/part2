import React, { useState } from "react";

const Demo = () => {
  const [persons, setPersons] = useState([
      { name: "Arto Hellas",
        number: "09065582322"}]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [error, setError] = useState(false);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((p) => p.name === newName && p.number === newNumber)) {
      setError(true);
      return false;
    }
    const personObject = {
      name: newName,
      number: newNumber 

    };
    setPersons([...persons, personObject]);
    setNewName('')
    setNewNumber('')
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
      {error && <p className="error">{newName} already exists.`</p>}
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </div>
  );
};

export default Demo;