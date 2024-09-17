import React from 'react'
import logo from '../images/pizza.png'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function HomeNavbar() {
    let handleClick = () => {
        toast.error("Login to see contents");
    }
  return (
    <div>
      <header
    class="relative z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
    <div class="px-4">
        <div class="flex items-center justify-between">
            <div class="flex shrink-0">
                <Link aria-current="page" class="flex items-center" to="/">
                    <img class="h-10 w-auto" src={logo} alt="YT Logo"/>
                    <p class="sr-only">Website Title</p>
                </Link>
            </div>

            <div className='text-xl'>PizzaMan</div>
            
            <div class="flex items-center justify-end gap-3">
                <Link class="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                    to="/customerreg">Sign up</Link>
                <Link class="inline-flex items-center justify-center rounded-xl bg-black/100 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    to="/custlogin">Login</Link>
            </div>
        </div>
    </div>
</header>
    </div>
  )
}

export default HomeNavbar
