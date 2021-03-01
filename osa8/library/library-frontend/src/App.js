import React, { useState } from 'react'
import Authors from './components/Authors'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './query'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const { data: dataB, loading: loadingB } = useQuery(ALL_BOOKS)
  const { data: dataA, loading: loadingA } = useQuery(ALL_AUTHORS)

  const [page, setPage] = useState('authors')

  if(loadingA || loadingB) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        authors={dataA.allAuthors}
        show={page === 'authors'}
      />

      <Books
        books={dataB.allBooks}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App