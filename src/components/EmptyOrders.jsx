import React from 'react'
import logo from '../images/EmptyCart.png'
import { Link } from 'react-router-dom'

function EmptyOrders() {
  return (
    <>
    <section className='text-gray-700 body-font '>
    <div className='mb-10 flex justify-center'>
    <div>
      <img className=' ml-40 px-20 py-20 w-96' src="https://static.vecteezy.com/system/resources/previews/002/405/993/original/cartoon-smiling-italian-chef-with-big-moustache-holding-2-empty-plates-with-smoke-steam-for-food-product-vector.jpg" alt="" />
        <span className='text-3xl font-bold'>😞 No Orders Found 😞</span> <br />
        <br />
        <h1 className='text-3xl font-sans'>Uh-ho! It looks like you haven't placed any orders yet!</h1>
        <div className='flex justify-center'>
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

export default EmptyOrders;

// import React from 'react';
// import { Link } from 'react-router-dom';

// function EmptyOrders() {
//   return (
//     <section className='text-gray-700 body-font flex items-center justify-center min-h-screen'>
//       <div className='flex flex-col items-center justify-center bg-white'>
//         <img 
//           className='w-64 mb-6' 
//           src="https://static.vecteezy.com/system/resources/previews/002/405/993/original/cartoon-smiling-italian-chef-with-big-moustache-holding-2-empty-plates-with-smoke-steam-for-food-product-vector.jpg" 
//           alt="Empty Orders" 
//         />
//         <span className='text-4xl font-bold mb-4'>😞 No Orders Found 😞</span>
//         <h1 className='text-3xl font-sans mb-6'>Uh-oh! It looks like you haven't placed any orders yet!</h1>
//         <Link to="/homepage">
//           <button 
//             type="button" 
//             className="py-2 px-4 flex items-center text-sm font-bold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//           >
//             <svg 
//               className="mr-2" 
//               xmlns="http://www.w3.org/2000/svg" 
//               width="24" 
//               height="24" 
//               viewBox="0 0 24 24" 
//               fill="none" 
//               stroke="currentColor" 
//               strokeWidth="2" 
//               strokeLinecap="round" 
//               strokeLinejoin="round"
//             >
//               <path d="m5 11 4-7"></path>
//               <path d="m19 11-4-7"></path>
//               <path d="M2 11h20"></path>
//               <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"></path>
//               <path d="m9 11 1 9"></path>
//               <path d="M4.5 15.5h15"></path>
//               <path d="m15 11-1 9"></path>
//             </svg>
//             Continue Carving
//           </button>
//         </Link>
//       </div>
//     </section>
//   );
// }

// export default EmptyOrders;

// import React from 'react';
// import { Link } from 'react-router-dom';

// function EmptyOrders() {
//   return (
//     <section className='text-gray-700 body-font flex items-center justify-center min-h-screen'>
//       <div className='flex flex-col items-center justify-center bg-white p-6 w-full max-w-md h-full max-h-full'>
//         <img 
//           className='w-48' 
//           src="https://static.vecteezy.com/system/resources/previews/002/405/993/original/cartoon-smiling-italian-chef-with-big-moustache-holding-2-empty-plates-with-smoke-steam-for-food-product-vector.jpg" 
//           alt="Empty Orders" 
//         />
//         <span className='text-3xl font-bold mb-2'>😞 No Orders Found 😞</span>
//         <h1 className='text-2xl font-sans mb-4 text-center'>Uh-oh! It looks like you haven't placed any orders yet!</h1>
//         <Link to="/homepage">
//           <button 
//             type="button" 
//             className="py-2 px-4 flex items-center text-sm font-bold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//           >
//             <svg 
//               className="mr-2" 
//               xmlns="http://www.w3.org/2000/svg" 
//               width="24" 
//               height="24" 
//               viewBox="0 0 24 24" 
//               fill="none" 
//               stroke="currentColor" 
//               strokeWidth="2" 
//               strokeLinecap="round" 
//               strokeLinejoin="round"
//             >
//               <path d="m5 11 4-7"></path>
//               <path d="m19 11-4-7"></path>
//               <path d="M2 11h20"></path>
//               <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"></path>
//               <path d="m9 11 1 9"></path>
//               <path d="M4.5 15.5h15"></path>
//               <path d="m15 11-1 9"></path>
//             </svg>
//             Continue Carving
//           </button>
//         </Link>
//       </div>
//     </section>
//   );
// }

// export default EmptyOrders;
