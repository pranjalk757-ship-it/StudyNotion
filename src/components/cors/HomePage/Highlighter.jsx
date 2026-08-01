import React from 'react'

function Highlighter({text,color}) {
  return (
    <span className={`font-bold ${color} `}>
        {' '}
        {text}
    </span>
  )
}

export default Highlighter