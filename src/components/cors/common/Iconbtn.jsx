import React from 'react'

function Iconbtn({
    text,
    type,
    children,
    onClick,
    customClass
}) {
  return (
    <button
        type={type}
        onClick={onClick}
        className={`bg-yellow-100 text-black px-4 py-2 rounded-md text-sm font-bold ${customClass}`}
    >
        {
            children ? children : text
        }
    </button>
  )
}

export default Iconbtn