import React, { useState } from 'react'

const PersonForm = (props) => {
    return (
      <>
        <form onSubmit={props.submitHandler}>
        <div>
          {props.nameText}<input value={props.name} onChange={props.nameHandler} />
          <br />
          {props.numberText}<input value={props.number} onChange={props.numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        </form>
      </>
  )}

export default PersonForm