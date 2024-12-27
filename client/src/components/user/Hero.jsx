import React from 'react'
import { FaUserCircle } from "react-icons/fa";

const Hero = () => {
  return (
    <div >
       <nav className='p uppercase w-[100vw] flex items-center border p-2 justify-around'>
       <h1 className='text-3xl p font-extrabold uppercase'>Gym rats</h1>
       <div className="flex gap-x-10 font-semibold text-[15px] tracking-widest p  ">
        <a href='/shop'>Shop</a>
        <p>About</p>
        <p>contact</p>
        <a href='/cart'>cart</a>
       </div>
       <FaUserCircle className='w-8 h-8' />
       <button className='btn'>Log out</button>
       </nav>
       <div className="border flex justify-center items-center w-full">
        <div className="border">
          <img src="" alt="" />
        </div>
        <div className="border">
        </div>
       </div>
    </div>
  )
}

export default Hero