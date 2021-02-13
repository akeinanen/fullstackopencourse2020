import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Input from './components/Input'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  noteService
    .getAll()
      .then(response => {
        setPersons(response.data)
  })


/* When button is clicked, creates object of input's value and creates new array includin newName */
  const addPerson = (event) => {
    event.preventDefault()

    const nameObject = {
      name : newName,
      number : newNumber
    }
    console.log(persons.find(person => person.name === newName))
    console.log(newName)
    /* Check if the newName is already in phonebook */
    
    if (persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already in phonebook, do you want to replace it?`)) {
        noteService
          .replace(nameObject, persons)
          .then(response => {
            setPersons(persons.map(person => person.name !== person.name ? person : response.data))
          })
      }
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already in this phonebook`)
    } else {
      noteService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
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

  const handlePersonDelete = (event) => {
    if(window.confirm(`Delete ${event.target.name}?`)) {
    noteService
      .deletePerson(event.target.value)
      .then(response => console.log(response.data))
    }
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
        handlePersonDelete={handlePersonDelete}
      />
  </>
)
}

export default App