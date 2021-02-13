import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Input from './components/Input'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ eventMessage, setEventMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    noteService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

/* When button is clicked, creates object of input's value and creates new array includin newName */
  const addPerson = (event) => {
    event.preventDefault()

    const nameObject = {
      name : newName,
      number : newNumber
    }

    const oldNameObject = (persons.find(person => person.name === newName))
    const oldNumberObject = (persons.find(person => person.number === newNumber))

    /* Check if the newName is already in phonebook */
    if (persons.some(person => person.name === newName)) {
      
      if(window.confirm(`${newName} is already in phonebook, do you want to replace it?`)) {
          noteService
            .replace(nameObject, oldNameObject.id)
            .then(response => {
              setPersons(persons.map(person => person.id !== oldNameObject.id ? person : response.data))
              setEventMessage(`Number ${oldNameObject.number} was replaced with ${response.data.number}`)
            }) 

        }
    } else if (persons.some(person => person.number === newNumber)) {

      if(window.confirm(`${newNumber} is already in this phonebook, do you want to replace it?`)) {
          noteService
            .replace(nameObject, oldNumberObject.id)
            .then(response => {
              setPersons(persons.map(person => person.id !== oldNumberObject.id ? person : response.data)) 
              setEventMessage(`${oldNumberObject.name} was replaced with ${response.data.name}`)
              setTimeout(() => {
                setEventMessage(null)
              }, 3000)
            })
            .catch(() => {
              setErrorMessage(`Number was already removed from the server!`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
            })
      }
    } else {
      noteService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setEventMessage(`${response.data.name} was added correctly`)
          setTimeout(() => {
            setEventMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
      .then( 
        setPersons(persons.filter(person => person.name !== event.target.name)),
        setEventMessage(`${event.target.name} was deleted successfully`),
        setTimeout(() => {
          setEventMessage(null)
        }, 3000)
      )
    }
  }


  return (
    <>
      <h2>Phonebook</h2>  

      <Notification eventMessage={eventMessage} errorMessage={errorMessage} />

      <Input 
        text="Filter by name:" 
        filter={filter} 
        handleChange={handleFilterChange} 
      />

      <br /><br /><hr />

      <PersonForm 
        submitHandler={addPerson} 
        nameText='Name:' 
        name={newName}
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