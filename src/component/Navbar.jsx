import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-amber-700 text-white py-2'>
        <div className="logo">
            <span className=' cursor-pointer font-bold text-4xl mx-5'>
        ws
            </span>
        </div>
        <ul className="flex gap-9 mx-7">
            <li className='cursor-pointer hover:font-bold  '>home</li>
            <li className='cursor-pointer hover:font-bold '>tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
