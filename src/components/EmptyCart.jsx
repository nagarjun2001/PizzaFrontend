import React from 'react'
import logo from '../images/EmptyCart.png'
import { Link } from 'react-router-dom'

function EmptyCart() {
  return (
    <>
    <section className='text-gray-700 body-font '>
    <div className=' flex justify-center'>
    <div>
      <img className=' ml-48 w-96 px-20 py-20' src="https://static.vecteezy.com/system/resources/previews/002/405/993/original/cartoon-smiling-italian-chef-with-big-moustache-holding-2-empty-plates-with-smoke-steam-for-food-product-vector.jpg" alt="" />
        <span className='text-4xl ml-28 font-bold'>😞 Your Cart is Empty and Hungry 😞</span> <br />
        <br />
        <h1 className='text-3xl font-sans'>Uh-ho! Looks like you haven't added any food to your cart yet!</h1>
        <div className='  flex justify-center'>
        <Link to="/homepage">
            
        <button type="button" class="mt-4 py-2 px-2 flex justify-center items-center text-sm font-bold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
  <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m5 11 4-7"></path>
    <path d="m19 11-4-7"></path>
    <path d="M2 11h20"></path>
    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"></path>
    <path d="m9 11 1 9"></path>
    <path d="M4.5 15.5h15"></path>
    <path d="m15 11-1 9"></path>
  </svg>
&nbsp;Continue Carving&nbsp;
</button>


        </Link>
        </div>
    </div>
    </div>
    </section>
    </>
  )
}

export default EmptyCart
