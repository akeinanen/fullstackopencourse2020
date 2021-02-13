import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addVote } from './../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    const anecdotesToShow = () => {
      if(props.filter) {
        return props.anecdotes.filter(a => a.content.toUpperCase().indexOf(props.filter.toUpperCase()) > -1).sort((a, b) => b.votes - a.votes)
      } else {
        return props.anecdotes.sort((a, b) => b.votes - a.votes)
      }
    }

    const vote = (anecdote) => {
        props.addVote(anecdote)
        props.setNotification(`you voted ${anecdote.content}`, 5000)
    }

    return (
        <>
        {anecdotesToShow().map(anecdote =>
            <div className="anecdote" key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
        )}
        </>
    )
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)