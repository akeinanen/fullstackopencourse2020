import React, { useState } from 'react'
import Input from './components/Input'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '044 3010 565'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


/* When button is clicked, creates object of input's value and creates new array includin newName */
  const addPerson = (event) => {
    event.preventDefault()

    const nameObject = {
      name : newName,
      number : newNumber
    }

    /* Check if the newName is already in phonebook */
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in this phonebook`)
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already in this phonebook`)
    } else
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    persons.filter(person => person.name === event.target.value)
  }


  return (
    <>
      <h2>Phonebook</h2>  

      <Input 
        text="Filter by name:" 
        filter={filter} 
        handleChange={handleFilterChange} 
      />

      <br /><br /><hr />

      <PersonForm 
        submitHandler={addPerson} 
        nameText='Name:' 
        nameHandler={handleNameChange} 
        numberText='Number:'
        number={newNumber}
        numberHandler={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons 
        persons={persons} 
        filter={filter}
      />
  </>
)
}

export default App