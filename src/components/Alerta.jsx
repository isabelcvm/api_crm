import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className='my-4 p-3 bg-red-500 text-center text-bold text-white uppercase '>
        {children}
    </div>
  )
}

export default Alerta