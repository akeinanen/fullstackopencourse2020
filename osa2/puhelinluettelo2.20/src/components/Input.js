import React, { useState } from 'react'

const Input = ({text, filter, handleChange}) => {
    return (
      <>
        {text}<input value={filter} onChange={handleChange} />
      </>
)}

export default Input