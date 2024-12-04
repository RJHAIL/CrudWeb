import React from 'react'

export default function Navbar() {
  return (
    <>
      <nav className='navbar'>
        <div className='container-fluid p-2'>
        <input type="text" name='' id='' placeholder='Search' className='mx-3 searchinput'/>
        <button className='btn btn-dark text-white mx-3'>Logout</button>

        </div>
      </nav>
    </>
  )
}
