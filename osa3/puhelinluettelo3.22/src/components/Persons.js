import React, { useState } from 'react'

const Persons = ({persons, filter, handlePersonDelete}) => {
  
    return (
      <>
        
        <ul>        
          {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
              <li className="person" key={person.name}>{person.name} {person.number} <button value={person.id} name={person.name} onClick={handlePersonDelete}>delete</button></li>
          )}
        </ul>
      </>
)}


export default Persons
  