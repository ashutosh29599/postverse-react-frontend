import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='flex flex-col items-center'>
        <h1>Welcome to PostVerse!</h1>
        <h3>This is the landing page.</h3>
        <Link to={"/login"}>
            <button className="text-sm ml-2 bg-white text-blue-700/75 py-1 px-1 rounded-lg">
                Login
            </button>
        </Link>

        <Link to={"/register"}>
            <button className="text-sm ml-2 bg-white text-blue-700/75 py-1 px-1 rounded-lg">
                Register
            </button>
        </Link>
    </div>
  )
}

export default LandingPage