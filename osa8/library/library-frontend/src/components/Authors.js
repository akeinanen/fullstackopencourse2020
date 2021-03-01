import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_NUMBER } from '../query'

const Authors = ({ authors, show }) => {
  const [author, setAuthor] = useState(null)
  const [born, setBorn] = useState('')
  const [ editNumber ] = useMutation(EDIT_NUMBER, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!authors.length || !show) {
    return null
  }

  const options = []
  
  authors.map(a =>
      options.push({ value: a.name, label: a.name })
  )

  const submit = (event) => {
    event.preventDefault()
    editNumber({ variables: { author: author.value, setBornTo: born } })

    setAuthor('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
            <div>Name 
              <Select 
                defaultValue={author}
                onChange={setAuthor}
                options={options}
              />
            </div>
            <div>Born
              <input
                type='number'
                value={born}
                onChange={({target}) => setBorn(target.value)}
              />
            </div>
            <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors