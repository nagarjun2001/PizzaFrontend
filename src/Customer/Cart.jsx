// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaTrashAlt } from 'react-icons/fa';
// import CustomerNavbar from '../Navbar/CustomerNavbar';

// function Cart() {
//   const [cart, setCart] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [sourceCartId, setSourceCartId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const custId = sessionStorage.getItem('custid');

//     if (!custId) {
//       console.error('Customer ID not found in session storage.');
//       return;
//     }

//     axios.get(`http://localhost:1234/simcart/customer/${custId}`)
//       .then(res => {
//         const cartId = res.data.id;
//         setCart(res.data);
//         setSourceCartId(cartId);
//         sessionStorage.setItem('cartId', cartId);
//         return axios.get(`http://localhost:1234/simcartitems/cart/${cartId}`);
//       })
//       .then(res => {
//         const itemsWithFoodDetails = res.data;
//         setCartItems(itemsWithFoodDetails);
//         calculateTotalPrice(itemsWithFoodDetails);
//       })
//       .catch(err => {
//         console.error('Error fetching cart data:', err);
//         toast.error('Failed to fetch cart data.');
//       });
//   }, []);

//   const calculateTotalPrice = (items) => {
//     const total = items.reduce((acc, item) => acc + (item.food.fprice * item.qty), 0);
//     setTotalPrice(total);
//   };

//   const removeItem = (cartItemId) => {
//     axios.delete(`http://localhost:1234/simcartitems/${cartItemId}`)
//       .then(() => {
//         const updatedItems = cartItems.filter(item => item.id !== cartItemId);
//         setCartItems(updatedItems);
//         calculateTotalPrice(updatedItems);
//       })
//       .catch(err => {
//         console.error('Error removing item:', err);
//         toast.error('Failed to remove item.');
//       });
//   };

//   const updateQuantity = (cartItemId, quantity) => {
//     if (quantity < 1) return;

//     axios.put(`http://localhost:1234/simcartitems/${cartItemId}`, { qty: quantity })
//       .then(() => {
//         const updatedItems = cartItems.map(item =>
//           item.id === cartItemId ? { ...item, qty: quantity } : item
//         );
//         setCartItems(updatedItems);
//         calculateTotalPrice(updatedItems);
//       })
//       .catch(err => {
//         console.error('Error updating quantity:', err);
//         toast.error('Failed to update quantity.');
//       });
//   };

//   if (!cart) return <div>Loading...</div>;

//   return (
//     <>
//       <CustomerNavbar />
//       <h2 className="title font-manrope font-bold text-2xl leading-10 mb-8 text-start text-black">Cart</h2>
//       <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
//         {cartItems.length === 0 ? (
//           <div className="text-center text-gray-500">Your cart is empty.</div>
//         ) : (
//           <div className="bg-white shadow-md rounded-xl p-6">
//             {cartItems.map(item => (
//               <div key={item.id} className="flex items-center justify-between mb-6 border-b border-gray-200 py-4">
//                 <div className="flex items-center">
//                   <Link to={`/product/${item.food.id}`}>
//                     <img
//                       src={`data:image;base64,${item.food.fimg}`}
//                       alt={item.food.fname}
//                       className="w-24 h-24 object-cover rounded-xl mr-4"
//                     />
//                   </Link>
//                   <div>
//                     <h5 className="font-semibold text-lg leading-8 text-black">{item.food.fname}</h5>
//                     <p className="font-normal text-md leading-8 text-gray-500">₹ {item.food.fprice}</p>
//                     <div className="flex items-center mt-2">
//                       <button
//                         onClick={() => updateQuantity(item.id, item.qty - 1)}
//                         disabled={item.qty <= 1}
//                         className="hover:bg-gray-200 px-4 py-2 rounded-l-full border border-gray-300"
//                       >
//                         -
//                       </button>
//                       <span className="mx-4 text-md font-semibold">{item.qty}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.qty + 1)}
//                         className="hover:bg-gray-200 px-4 py-2 rounded-r-full border border-gray-300"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-md font-semibold">
//                   ₹ {item.food.fprice * item.qty}
//                 </div>
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   <FaTrashAlt size={20} />
//                 </button>
//               </div>
//             ))}
//             <div className="flex justify-between">
//               <p className="font-manrope font-medium text-xl leading-9 text-gray-900">Total</p>
//               <h6 className="font-manrope font-medium text-xl leading-9 text-indigo-500">₹ {totalPrice.toFixed(2)}</h6>
//             </div>
//             <div className="flex justify-center sm:justify-end mt-8">
//               {/* <button
//                 onClick={handleCopyCart}
//                 className="rounded-full w-full max-w-[250px] py-3 text-center bg-green-600 font-semibold text-lg text-white flex items-center justify-center transition-all duration-500 hover:bg-green-700"
//               >
//                 Copy Cart
//               </button> */}
//               <Link to="/payment">
//                 <button
//                   // onClick={handleCheckout}
//                   className="rounded-full w-full max-w-[250px] py-3 text-center bg-indigo-600 font-semibold text-lg text-white flex items-center justify-center transition-all duration-500 hover:bg-indigo-700"
//                 >
//                   Continue to Payment
//                   <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
//                     <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </section>
//     </>
//   );
// }

// export default Cart;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaTrash } from 'react-icons/fa';
// import CustomerNavbar from '../Navbar/CustomerNavbar';

// function Cart() {
//   const [cart, setCart] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalItems, setTotalItems] = useState(0); // State for total items
//   const [sourceCartId, setSourceCartId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const custId = sessionStorage.getItem('custid');

//     if (!custId) {
//       console.error('Customer ID not found in session storage.');
//       return;
//     }

//     axios.get(`http://localhost:1234/simcart/customer/${custId}`)
//       .then(res => {
//         const cartId = res.data.id;
//         setCart(res.data);
//         setSourceCartId(cartId);
//         sessionStorage.setItem('cartId', cartId);
//         return axios.get(`http://localhost:1234/simcartitems/cart/${cartId}`);
//       })
//       .then(res => {
//         const itemsWithFoodDetails = res.data;
//         setCartItems(itemsWithFoodDetails);
//         setTotalItems(itemsWithFoodDetails.reduce((acc, item) => acc + item.qty, 0)); // Calculate total items
//         calculateTotalPrice(itemsWithFoodDetails);
//       })
//       .catch(err => {
//         console.error('Error fetching cart data:', err);
//         toast.error('Failed to fetch cart data.');
//       });
//   }, []);

//   const calculateTotalPrice = (items) => {
//     const total = items.reduce((acc, item) => acc + (item.food.fprice * item.qty), 0);
//     setTotalPrice(total);
//   };

//   const removeItem = (cartItemId) => {
//     axios.delete(`http://localhost:1234/simcartitems/${cartItemId}`)
//       .then(() => {
//         const updatedItems = cartItems.filter(item => item.id !== cartItemId);
//         setCartItems(updatedItems);
//         setTotalItems(updatedItems.reduce((acc, item) => acc + item.qty, 0)); // Update total items
//         calculateTotalPrice(updatedItems);
//       })
//       .catch(err => {
//         console.error('Error removing item:', err);
//         toast.error('Failed to remove item.');
//       });
//   };

//   const updateQuantity = (cartItemId, quantity) => {
//     if (quantity < 1) return;

//     axios.put(`http://localhost:1234/simcartitems/${cartItemId}`, { qty: quantity })
//       .then(() => {
//         const updatedItems = cartItems.map(item =>
//           item.id === cartItemId ? { ...item, qty: quantity } : item
//         );
//         setCartItems(updatedItems);
//         setTotalItems(updatedItems.reduce((acc, item) => acc + item.qty, 0)); // Update total items
//         calculateTotalPrice(updatedItems);
//       })
//       .catch(err => {
//         console.error('Error updating quantity:', err);
//         toast.error('Failed to update quantity.');
//       });
//   };

//   if (!cart) return <div className="text-center text-gray-500">Loading...</div>;

//   return (
//     <>
//       <CustomerNavbar />
//       <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Your Cart</h2>
//       <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
//         <div className="border-b border-gray-300 pb-6 mb-6">
//           <div className="flex justify-between mb-4">
//             <p className="text-xl font-semibold text-gray-800">Total Items: <span className="font-semibold">{totalItems}</span></p>
//           </div>
//           {cartItems.length === 0 ? (
//             <div className="text-center text-gray-500 text-lg">Your cart is empty.</div>
//           ) : (
//             <div>
//               <div className="flex mb-4 border-b border-gray-300 pb-2">
//                 <div className="flex-1 font-semibold text-gray-800">Product</div>
//                 <div className="w-32 text-center font-semibold text-gray-800">Price</div>
//                 <div className="w-32 text-center font-semibold text-gray-800">Quantity</div>
//                 <div className="w-32 text-center font-semibold text-gray-800">Total</div>
//                 <div className="w-16 text-center font-semibold text-gray-800">Action</div>
//               </div>
//               {cartItems.map(item => (
//                 <div key={item.id} className="flex items-center justify-between mb-4 py-2 border-b border-gray-200">
//                   <div className="flex items-center flex-1">
//                     <Link to={`/product/${item.food.id}`}>
//                       <img
//                         src={`data:image;base64,${item.food.fimg}`}
//                         alt={item.food.fname}
//                         className="w-20 h-20 object-cover rounded-md mr-4 shadow-md"
//                       />
//                     </Link>
//                     <div className="flex-1">
//                       <h5 className="text-lg font-semibold text-gray-800">{item.food.fname}</h5>
//                     </div>
//                   </div>
//                   <div className="w-32 text-center text-gray-700">₹ {item.food.fprice}</div>
//                   <div className="w-32 text-center flex items-center justify-center">
//                     <button
//                       onClick={() => updateQuantity(item.id, item.qty - 1)}
//                       disabled={item.qty <= 1}
//                       className="bg-red-600 text-white px-3 py-1 rounded-l-md border border-gray-300 hover:bg-red-700 disabled:opacity-50"
//                     >
//                       -
//                     </button>
//                     <span className="mx-2 text-md font-semibold">{item.qty}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.qty + 1)}
//                       className="bg-red-600 text-white px-3 py-1 rounded-r-md border border-gray-300 hover:bg-red-700"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div className="w-32 text-center font-semibold text-red-600">
//                     ₹ {item.food.fprice * item.qty}
//                   </div>
//                   <button
//                     onClick={() => removeItem(item.id)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <FaTrash size={20} />
//                   </button>
//                 </div>
//               ))}
//               <div className="flex justify-between py-4 border-t border-gray-300 mt-6">
//                 <p className="text-xl font-semibold text-gray-800">Total</p>
//                 <h6 className="text-xl font-semibold text-red-600">₹ {totalPrice.toFixed(2)}</h6>
//               </div>
//               <div className="flex justify-center sm:justify-end mt-6">
//                 <Link to="/payment">
//                   <button
//                     className="bg-red-600 text-white rounded-full w-full max-w-[250px] py-3 text-center font-semibold text-lg flex items-center justify-center transition duration-300 hover:bg-red-700"
//                   >
//                     Continue to Payment
//                     <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
//                       <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

// export default Cart;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import CustomerNavbar from '../Navbar/CustomerNavbar';
import EmptyCart from '../components/EmptyCart';

function Cart() {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0); // State for total items
  const [sourceCartId, setSourceCartId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const custId = sessionStorage.getItem('custid');

    if (!custId) {
      console.error('Customer ID not found in session storage.');
      return;
    }

    axios.get(`http://localhost:1234/simcart/customer/${custId}`)
      .then(res => {
        const cartId = res.data.id;
        setCart(res.data);
        setSourceCartId(cartId);
        sessionStorage.setItem('cartId', cartId);
        return axios.get(`http://localhost:1234/simcartitems/cart/${cartId}`);
      })
      .then(res => {
        const itemsWithFoodDetails = res.data;
        setCartItems(itemsWithFoodDetails);
        setTotalItems(itemsWithFoodDetails.reduce((acc, item) => acc + item.qty, 0)); // Calculate total items
        calculateTotalPrice(itemsWithFoodDetails);
      })
      .catch(err => {
        console.error('Error fetching cart data:', err);
        toast.error('Failed to fetch cart data.');
      });
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + (item.food.fprice * item.qty), 0);
    setTotalPrice(total);
  };

  const removeItem = (cartItemId) => {
    axios.delete(`http://localhost:1234/simcartitems/${cartItemId}`)
      .then(() => {
        const updatedItems = cartItems.filter(item => item.id !== cartItemId);
        setCartItems(updatedItems);
        setTotalItems(updatedItems.reduce((acc, item) => acc + item.qty, 0)); // Update total items
        calculateTotalPrice(updatedItems);
      })
      .catch(err => {
        console.error('Error removing item:', err);
        toast.error('Failed to remove item.');
      });
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return;

    axios.put(`http://localhost:1234/simcartitems/${cartItemId}`, { qty: quantity })
      .then(() => {
        const updatedItems = cartItems.map(item =>
          item.id === cartItemId ? { ...item, qty: quantity } : item
        );
        setCartItems(updatedItems);
        setTotalItems(updatedItems.reduce((acc, item) => acc + item.qty, 0)); // Update total items
        calculateTotalPrice(updatedItems);
      })
      .catch(err => {
        console.error('Error updating quantity:', err);
        toast.error('Failed to update quantity.');
      });
  };

  if (!cart) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <>
      <CustomerNavbar />
      <h2 className="text-3xl font-bold mt-2 py-6 text-center">Your Cart</h2>
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
        <div className="border-b border-gray-300 pb-6 mb-6">
          <div className="flex justify-between mb-4">
            <p className="text-xl font-semibold text-gray-800">Total Items: <span className="font-semibold">{totalItems}</span></p>
          </div>
          {cartItems.length === 0 ? (
            // <div className="text-center text-gray-500 text-lg">Your cart is empty.</div>
            <EmptyCart />
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between mb-4 py-2 border-b border-gray-200">
                  <div className="flex items-center flex-1">
                    <Link to={`/product/${item.food.id}`}>
                      <img
                        src={`data:image;base64,${item.food.fimg}`}
                        alt={item.food.fname}
                        className="w-20 h-20 object-cover rounded-full mr-4 shadow-md"
                      />
                    </Link>
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-800">{item.food.fname}</h5>
                      <p className="text-sm text-gray-600">₹ {item.food.fprice} x {item.qty} = ₹ {item.food.fprice * item.qty}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="bg-red-600 text-white px-3 py-1 rounded-full border border-gray-300 hover:bg-red-700 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-md font-semibold">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                      className="bg-red-600 text-white px-3 py-1 rounded-full border border-gray-300 hover:bg-red-700"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-center text-gray-700 font-semibold mx-4">
                    ₹ {item.food.fprice * item.qty}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              ))}
              <div className="flex justify-between py-4 0-border-gray-300 mt-6">
                <p className="text-xl font-semibold text-gray-800">Total</p>
                <h6 className="text-xl font-semibold text-red-600">₹ {totalPrice.toFixed(2)}</h6>
              </div>
              <div className="flex justify-center sm:justify-end mt-6">
                <Link to="/payment">
                  <button
                    className="bg-red-600 text-white rounded-full py-2 px-4 text-center font-semibold text-lg flex items-center justify-center transition duration-300 hover:bg-red-700"
                  >
                    Continue to Payment
                    <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                      <path d="M7.25324 4.49609L12.2535 9.49631L7.75 14.4998" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Cart;
