import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {
  const [countrys, setCountrys] = useState([])
  const [filterText, setFilterText] = useState('')
  const [filteredCountrys, setFilteredCountrys] = useState([])


  // Get the data from REST API
  const promise = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
      setCountrys(response.data)
      })
  }
  useEffect(promise, [])

  // Send input's value to filterText's value
  const handleTextChange = (event) => {
    setFilterText(event.target.value)
    console.log(filteredCountrys.length);
    setFilteredCountrys(countrys.filter(country => 
      country.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1))
  }

  return (
    <>

      Filter Country's by name: <input value={filterText} onChange={handleTextChange} />
      <br />
      <ul>
        <Filter filteredCountrys={filteredCountrys} handleTextChange={handleTextChange} filterText={filterText} />
      </ul>
    </>
  )
}

export default App;
