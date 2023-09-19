import React from 'react'

const HighlightText = ({text, direction, gradient}) => {
  return (
    <span className={`font-bold text-transparent bg-clip-text ${direction} ${gradient}`}>
        {" "}
        {text}
        {" "}
    </span>
  )
}

export default HighlightText