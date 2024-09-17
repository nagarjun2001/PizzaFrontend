import React from 'react'
import logo from '../images/pizza.png'
import { Link, useNavigate } from 'react-router-dom'

function UserRegNav() {
  return (
    <div>
    <header
  className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
  <div className="px-4">
      <div className="flex items-center justify-between">
          <div className="flex shrink-0">
              <Link aria-current="page" className="flex items-center" to="/">
                  <img className="h-10 w-auto" src={logo} alt="YT Logo"/>
                  <p className="sr-only">Website Title</p>
              </Link>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
          Satisfy your carvings!          </div>
          <div className="flex items-center justify-end gap-3">
                  <Link to="#" onClick={() => window.history.back()} className="inline-flex items-center text-white-800 hover:text-blue-700">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 mr-2"
    >
      <path
        d="M15 19l-7-7 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span>Go Back</span>
  </Link>
  <Link className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                  to="/custlogin">Login</Link>
          </div>
      </div>
  </div>
</header>
  </div>
  )
}

export default UserRegNav
