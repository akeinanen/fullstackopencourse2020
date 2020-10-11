import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const Statistics = ({ text, feedback }) => {
  return (
      <table>
          <tbody>
            <tr>
                <td>{text}</td>
                <td>{feedback}</td>            
             </tr>
          </tbody>
    </table>
  )
}


const App = (props) => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const goodFeedback = () => { 
    setGood(good + 1)
    setAll(all + 1) 
  }
  const neutralFeedback = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const badFeedback = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

    if (all === 0) {
        return (
            <div>
                <h2>give feedback</h2>
                <Button handleClick={goodFeedback} text='good' />
                <Button handleClick={neutralFeedback} text='neutral' />
                <Button handleClick={badFeedback} text='bad' />

                <h2>statistics</h2>
                <p>No feedbacks given</p>
            </div>
            )
    }
    else {
        return (
            <div>
                <h2>give feedback</h2>
                <Button handleClick={goodFeedback} text='good' />
                <Button handleClick={neutralFeedback} text='neutral' />
                <Button handleClick={badFeedback} text='bad' />

                <h2>statistics</h2>
                <Statistics text='good' feedback={good} />
                <Statistics text='neutral' feedback={neutral} />
                <Statistics text='bad' feedback={bad} />
                <Statistics text='all' feedback={all} />
                <Statistics text="keskiarvo" feedback={(good - bad) / all} />
                <Statistics text="positive" feedback={good * 100 / all + '%'} />
            </div>
        )
    }
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)