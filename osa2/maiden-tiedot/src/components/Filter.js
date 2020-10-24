import React from 'react'
import Weather from './Weather'


const Filter = ({filteredCountrys, handleTextChange, filterText, setFilterText}) => {


    if(filterText) {
        if (filteredCountrys.length === 1) {
            console.log(filteredCountrys.map(country => country.capital))
            return (
                filteredCountrys.map(country =>
                    <div key={country.name}>
                        <h1>{country.name}</h1>
                        <div>Capital: {country.capital}</div>
                        <div>Population: {country.population}</div>


                        <h2>Languages</h2>
                        <ul>
                            {country.languages.map(language => 
                                <li key={language.name}>{language.name}</li>)}
                        </ul>
                        <br />

                        <img alt="country-flag" width="120" src={country.flag} />
                        
                        <Weather capital={country.capital} />
                    </div>     
            ))

        } else if (filteredCountrys.length === 0) {
            return(
                'Nothing found'
            )

        } else if (filteredCountrys.length < 11) {
            return(
                filteredCountrys.map(country => 
                    <li key={country.name}>{country.name}<button value={country.name} onClick={handleTextChange}>Show</button></li>)
            )

        } else {
                return (
                'Too many matches, try specify another filter'
                )
        }

    } else {
        return (
            ''
        )
    }
} 
     

export default Filter;

