// import React, { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const PaymentForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     paymentMethod: 'Credit/Debit Card',
//     upiId: '',
//   });

//   const navi = useNavigate();
//   const [errors, setErrors] = useState({
//     name: false,
//     email: false,
//     cardNumber: false,
//     expiryDate: false,
//     cvv: false,
//     upiId: false,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePaymentMethodChange = (e) => {
//     setFormData({
//       ...formData,
//       paymentMethod: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {
//       name: formData.paymentMethod === 'Credit/Debit Card' && !formData.name,
//       email: formData.paymentMethod === 'Credit/Debit Card' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
//       cardNumber: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{16}$/.test(formData.cardNumber),
//       expiryDate: formData.paymentMethod === 'Credit/Debit Card' && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate),
//       cvv: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{3}$/.test(formData.cvv),
//       upiId: formData.paymentMethod === 'UPI' && !/^[a-zA-Z0-9@._-]+$/.test(formData.upiId),
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).includes(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please correct the errors in the form.');
//       return;
//     }
  
//     const cartId = sessionStorage.getItem('cartId');
//     const custId = sessionStorage.getItem('custid');
  
//     if (!cartId || !custId) {
//       toast.error('Cart ID or Customer ID is missing.');
//       return;
//     }
  
//     try {
//       // Fetch cart details
//       const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//       const cart = cartResponse.data;
  
//       if (!cart || !Array.isArray(cart.cartiem)) {
//         toast.error('Invalid cart data.');
//         return;
//       }
  
//       // Create snapshot for each cart item
//       const snapshotPromises = cart.cartiem.map(item => {
//         // Add defensive checks to ensure item properties are defined
//         const cartIdFromItem = item.cart ? item.cart.id : cartId; // Fallback to cartId from session storage
//         const foodIdFromItem = item.food ? item.food.id : null;
  
//         if (!foodIdFromItem) {
//           console.warn('Skipping item due to missing food information:', item);
//           return null;
//         }
  
//         return axios.post('http://localhost:1234/carthistory/snapshot', null, {
//           params: {
//             cartId: cartIdFromItem,
//             foodId: foodIdFromItem,
//             total: item.total,
//             qty: item.qty,
//             paid: true,
//             customerId: custId,
//           },
//         });
//       }).filter(promise => promise !== null); // Filter out null promises
  
//       await Promise.all(snapshotPromises);
  
//       // Clear cart items using PUT method
//       const clearResponse = await axios.put('http://localhost:1234/simcart', {
//         id: cartId, // Assuming the cart ID is sent in the body as per the PUT mapping
//       });
  
//       if (clearResponse.data === 'Success') {
//         // Success message
//         toast.success('Payment processed successfully!');
//         navi('/success'); // Navigate to a success page or home
//       } else {
//         toast.error('Failed to clear cart items.');
//       }
//     } catch (error) {
//       console.error('Error during payment process:', error);
//       toast.error('An error occurred while processing the payment.');
//     }
//   };
  

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h1 className="text-2xl font-semibold text-center mb-6">Payment Details</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Payment Method Selection */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Payment Method</label>
//           <select
//             name="paymentMethod"
//             value={formData.paymentMethod}
//             onChange={handlePaymentMethodChange}
//             className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none border-gray-300"
//           >
//             <option value="Credit/Debit Card">Credit/Debit Card</option>
//             <option value="UPI">UPI</option>
//             <option value="COD">Cash on Delivery</option>
//           </select>
//         </div>

//         {/* Conditional Fields Based on Payment Method */}
//         {formData.paymentMethod === 'Credit/Debit Card' && (
//           <>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.name && <p className="text-red-500 text-sm mt-1">Please enter your name.</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
//               <input
//                 type="text"
//                 id="cardNumber"
//                 name="cardNumber"
//                 value={formData.cardNumber}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.cardNumber && <p className="text-red-500 text-sm mt-1">Please enter a valid card number.</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
//               <input
//                 type="text"
//                 id="expiryDate"
//                 name="expiryDate"
//                 placeholder="MM/YY"
//                 value={formData.expiryDate}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.expiryDate && <p className="text-red-500 text-sm mt-1">Please enter a valid expiry date.</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
//               <input
//                 type="text"
//                 id="cvv"
//                 name="cvv"
//                 value={formData.cvv}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.cvv && <p className="text-red-500 text-sm mt-1">Please enter a valid CVV.</p>}
//             </div>
//           </>
//         )}

//         {formData.paymentMethod === 'UPI' && (
//           <div className="mb-4">
//             <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">UPI ID</label>
//             <input
//               type="text"
//               id="upiId"
//               name="upiId"
//               value={formData.upiId}
//               onChange={handleChange}
//               className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.upiId ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.upiId && <p className="text-red-500 text-sm mt-1">Please enter a valid UPI ID.</p>}
//           </div>
//         )}

//         {formData.paymentMethod === 'COD' && (
//           <div className="mb-4">
//             <p className="text-gray-700">You have selected Cash on Delivery. No additional details are required.</p>
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
//         >
//           Pay Now
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

//above code is last working fine

// import React, { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const PaymentForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     paymentMethod: 'Credit/Debit Card',
//     upiId: '',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     email: false,
//     cardNumber: false,
//     expiryDate: false,
//     cvv: false,
//     upiId: false,
//   });

//   const navi = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePaymentMethodChange = (e) => {
//     setFormData({
//       ...formData,
//       paymentMethod: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {
//       name: formData.paymentMethod === 'Credit/Debit Card' && !formData.name,
//       email: formData.paymentMethod === 'Credit/Debit Card' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
//       cardNumber: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{16}$/.test(formData.cardNumber),
//       expiryDate: formData.paymentMethod === 'Credit/Debit Card' && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate),
//       cvv: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{3}$/.test(formData.cvv),
//       upiId: formData.paymentMethod === 'UPI' && !/^[a-zA-Z0-9@._-]+$/.test(formData.upiId),
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).includes(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please correct the errors in the form.');
//       return;
//     }

//     const cartId = sessionStorage.getItem('cartId');
//     const custId = sessionStorage.getItem('custid');

//     if (!cartId || !custId) {
//       toast.error('Cart ID or Customer ID is missing.');
//       return;
//     }

//     try {
//       // Fetch cart details
//       const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//       const cart = cartResponse.data;

//       if (!cart || !Array.isArray(cart.cartiem)) {
//         toast.error('Invalid cart data.');
//         return;
//       }

//       // Create snapshot for each cart item
//       const snapshotPromises = cart.cartiem.map(item => {
//         const cartIdFromItem = item.cart ? item.cart.id : cartId;
//         const foodIdFromItem = item.food ? item.food.id : null;

//         if (!foodIdFromItem) {
//           console.warn('Skipping item due to missing food information:', item);
//           return null;
//         }

//         return axios.post('http://localhost:1234/carthistory/snapshot', null, {
//           params: {
//             cartId: cartIdFromItem,
//             foodId: foodIdFromItem,
//             total: item.total,
//             qty: item.qty,
//             paid: true,
//             customerId: custId,
//           },
//         });
//       }).filter(promise => promise !== null);

//       await Promise.all(snapshotPromises);

//       // Create order
//       const orderData = {
//         customer: { id: custId }, // Assuming customer ID is used to identify the customer
//         items: cart.cartiem.map(item => ({
//           cartId: item.cart ? item.cart.id : cartId,
//           foodId: item.food ? item.food.id : null,
//           total: item.total,
//           qty: item.qty,
//           paid: true,
//           customerId: custId,
//         })),
//         staff: null, // You can add logic to assign a staff if required
//         total: cart.cartiem.reduce((sum, item) => sum + item.total, 0),
//         deladdress: '', // You can add logic to capture delivery address if needed
//         payment: formData.paymentMethod !== 'COD',
//         paymentmethod: formData.paymentMethod,
//         isAccepted: false,
//         orderdate: new Date().toISOString().slice(0, 10),
//         delstatus: 'Pending',
//         issuestatus: 'None',
//       };

//       const orderResponse = await axios.post('http://localhost:1234/orders', orderData);

//       if (orderResponse.data === 'Success') {
//         // Clear cart items using PUT method
//         const clearResponse = await axios.put('http://localhost:1234/simcart', {
//           id: cartId,
//         });

//         if (clearResponse.data === 'Success') {
//           toast.success('Payment processed and order created successfully!');
//           navi('/success'); // Navigate to a success page or home
//         } else {
//           toast.error('Failed to clear cart items.');
//         }
//       } else {
//         toast.error('Failed to create order.');
//       }
//     } catch (error) {
//       console.error('Error during payment process:', error);
//       toast.error('An error occurred while processing the payment.');
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h1 className="text-2xl font-semibold text-center mb-6">Payment Details</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Payment Method Selection */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Payment Method</label>
//           <div className="flex items-center space-x-4">
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="Credit/Debit Card"
//                 checked={formData.paymentMethod === 'Credit/Debit Card'}
//                 onChange={handlePaymentMethodChange}
//                 className="form-radio"
//               />
//               <span className="ml-2">Credit/Debit Card</span>
//             </label>
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="UPI"
//                 checked={formData.paymentMethod === 'UPI'}
//                 onChange={handlePaymentMethodChange}
//                 className="form-radio"
//               />
//               <span className="ml-2">UPI</span>
//             </label>
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="COD"
//                 checked={formData.paymentMethod === 'COD'}
//                 onChange={handlePaymentMethodChange}
//                 className="form-radio"
//               />
//               <span className="ml-2">Cash on Delivery</span>
//             </label>
//           </div>
//         </div>

//         {/* Conditional Fields Based on Payment Method */}
//         {formData.paymentMethod === 'Credit/Debit Card' && (
//           <>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.name && <p className="text-red-500 text-sm mt-1">Please enter your name.</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
//               <input
//                 type="text"
//                 id="cardNumber"
//                 name="cardNumber"
//                 value={formData.cardNumber}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.cardNumber && <p className="text-red-500 text-sm mt-1">Please enter a valid card number.</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
//               <input
//                 type="text"
//                 id="expiryDate"
//                 name="expiryDate"
//                 placeholder="MM/YY"
//                 value={formData.expiryDate}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.expiryDate && <p className="text-red-500 text-sm mt-1">Please enter a valid expiry date.</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
//               <input
//                 type="text"
//                 id="cvv"
//                 name="cvv"
//                 value={formData.cvv}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.cvv && <p className="text-red-500 text-sm mt-1">Please enter a valid CVV.</p>}
//             </div>
//           </>
//         )}

//         {formData.paymentMethod === 'UPI' && (
//           <div className="mb-4">
//             <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">UPI ID</label>
//             <input
//               type="text"
//               id="upiId"
//               name="upiId"
//               value={formData.upiId}
//               onChange={handleChange}
//               className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.upiId ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.upiId && <p className="text-red-500 text-sm mt-1">Please enter a valid UPI ID.</p>}
//           </div>
//         )}

//         {formData.paymentMethod === 'COD' && (
//           <div className="mb-4">
//             <p className="text-gray-700">You have selected Cash on Delivery. No additional details are required.</p>
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
//         >
//           Pay Now
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

// above is the Best working code

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const PaymentForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     paymentMethod: 'Credit/Debit Card',
//     upiId: '',
//     address: '',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     email: false,
//     cardNumber: false,
//     expiryDate: false,
//     cvv: false,
//     upiId: false,
//     address: false,
//   });

//   const [cartTotal, setCartTotal] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCartTotal = async () => {
//       const cartId = sessionStorage.getItem('cartId');
//       if (cartId) {
//         try {
//           const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//           const cart = cartResponse.data;
//           if (cart && Array.isArray(cart.cartiem)) {
//             const total = cart.cartiem.reduce((sum, item) => sum + item.total, 0);
//             setCartTotal(total);
//           }
//         } catch (error) {
//           console.error('Error fetching cart total:', error);
//           toast.error('Failed to fetch cart total.');
//         }
//       }
//     };
//     fetchCartTotal();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePaymentMethodChange = (e) => {
//     setFormData({
//       ...formData,
//       paymentMethod: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {
//       name: formData.paymentMethod === 'Credit/Debit Card' && !formData.name,
//       email: formData.paymentMethod === 'Credit/Debit Card' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
//       cardNumber: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{16}$/.test(formData.cardNumber),
//       expiryDate: formData.paymentMethod === 'Credit/Debit Card' && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate),
//       cvv: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{3}$/.test(formData.cvv),
//       upiId: formData.paymentMethod === 'UPI' && !/^[a-zA-Z0-9@._-]+$/.test(formData.upiId),
//       address: !formData.address,
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).includes(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please correct the errors in the form.');
//       return;
//     }

//     const cartId = sessionStorage.getItem('cartId');
//     const custId = sessionStorage.getItem('custid');

//     if (!cartId || !custId) {
//       toast.error('Cart ID or Customer ID is missing.');
//       return;
//     }

//     try {
//       // Fetch cart details
//       const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//       const cart = cartResponse.data;

//       if (!cart || !Array.isArray(cart.cartiem)) {
//         toast.error('Invalid cart data.');
//         return;
//       }

//       // Create snapshot for each cart item
//       const snapshotPromises = cart.cartiem.map(item => {
//         const cartIdFromItem = item.cart ? item.cart.id : cartId;
//         const foodIdFromItem = item.food ? item.food.id : null;

//         if (!foodIdFromItem) {
//           console.warn('Skipping item due to missing food information:', item);
//           return null;
//         }

//         return axios.post('http://localhost:1234/carthistory/snapshot', null, {
//           params: {
//             cartId: cartIdFromItem,
//             foodId: foodIdFromItem,
//             total: item.total,
//             qty: item.qty,
//             paid: true,
//             customerId: custId,
//           },
//         });
//       }).filter(promise => promise !== null);

//       await Promise.all(snapshotPromises);

//       // Create order
//       const orderData = {
//         customer: { id: custId },
//         items: cart.cartiem.map(item => ({
//           cartId: item.cart ? item.cart.id : cartId,
//           foodId: item.food ? item.food.id : null,
//           total: item.total,
//           qty: item.qty,
//           paid: true,
//           customerId: custId,
//         })),
//         staff: null,
//         total: cartTotal,
//         deladdress: formData.address,
//         payment: formData.paymentMethod !== 'COD',
//         paymentmethod: formData.paymentMethod,
//         isAccepted: false,
//         orderdate: new Date().toISOString().slice(0, 10),
//         delstatus: 'Pending',
//         issuestatus: 'None',
//       };

//       const orderResponse = await axios.post('http://localhost:1234/orders', orderData);

//       if (orderResponse.data === 'Success') {
//         // Clear cart items using PUT method
//         const clearResponse = await axios.put('http://localhost:1234/simcart', {
//           id: cartId,
//         });

//         if (clearResponse.data === 'Success') {
//           toast.success('Payment processed and order placed successfully!');
//           navigate('/success');
//         } else {
//           toast.error('Failed to clear cart items.');
//         }
//       } else {
//         toast.error('Failed to create order.');
//       }
//     } catch (error) {
//       console.error('Error during payment process:', error);
//       toast.error('An error occurred while processing the payment.');
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 border border-gray-300">
//       <h1 className="text-3xl font-bold text-center mb-6">Payment Details</h1>
      
//       {/* Order Summary */}
//       <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-sm">
//         <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
//         <p className="text-lg">Order Total: <span className="font-bold">₹{cartTotal}</span></p>
//       </div>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Delivery Address */}
//         <div className="mb-6">
//           <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address</label>
//           <textarea
//             id="address"
//             name="address"
//             rows="4"
//             value={formData.address}
//             onChange={handleChange}
//             className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.address && <p className="text-red-500 text-sm mt-1">Please enter the delivery address.</p>}
//         </div>
        
//         {/* Payment Method Selection */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700">Payment Method</label>
//           <div className="flex flex-col space-y-4">
//             <label className="inline-flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="Credit/Debit Card"
//                 checked={formData.paymentMethod === 'Credit/Debit Card'}
//                 onChange={handlePaymentMethodChange}
//                 className="form-radio hidden"
//               />
//               <div className={`w-5 h-5 border-2 rounded-full ${formData.paymentMethod === 'Credit/Debit Card' ? 'bg-blue-500' : 'bg-white'} border-gray-300`} />
//               <span className="ml-2 text-lg">Credit/Debit Card</span>
//             </label>
//             <label className="inline-flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="UPI"
//                 checked={formData.paymentMethod === 'UPI'}
//                 onChange={handlePaymentMethodChange}
//                 className="form-radio hidden"
//               />
//               <div className={`w-5 h-5 border-2 rounded-full ${formData.paymentMethod === 'UPI' ? 'bg-blue-500' : 'bg-white'} border-gray-300`} />
//               <span className="ml-2 text-lg">UPI</span>
//             </label>
//             <label className="inline-flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="COD"
//                 checked={formData.paymentMethod === 'COD'}
//                 onChange={handlePaymentMethodChange}
//                 className="form-radio hidden"
//               />
//               <div className={`w-5 h-5 border-2 rounded-full ${formData.paymentMethod === 'COD' ? 'bg-blue-500' : 'bg-white'} border-gray-300`} />
//               <span className="ml-2 text-lg">Cash on Delivery</span>
//             </label>
//           </div>
//         </div>
        
//         {/* Payment Details */}
//         {formData.paymentMethod === 'Credit/Debit Card' && (
//           <>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name on Card</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.name && <p className="text-red-500 text-sm mt-1">Please enter the name on the card.</p>}
//             </div>
            
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>}
//             </div>
            
//             <div className="mb-4">
//               <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
//               <input
//                 type="text"
//                 id="cardNumber"
//                 name="cardNumber"
//                 value={formData.cardNumber}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.cardNumber && <p className="text-red-500 text-sm mt-1">Please enter a valid card number.</p>}
//             </div>

//             <div className="flex gap-4 mb-4">
//               <div className="w-1/2">
//                 <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
//                 <input
//                   type="text"
//                   id="expiryDate"
//                   name="expiryDate"
//                   placeholder="MM/YY"
//                   value={formData.expiryDate}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.expiryDate && <p className="text-red-500 text-sm mt-1">Please enter a valid expiry date.</p>}
//               </div>
              
//               <div className="w-1/2">
//                 <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
//                 <input
//                   type="text"
//                   id="cvv"
//                   name="cvv"
//                   value={formData.cvv}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.cvv && <p className="text-red-500 text-sm mt-1">Please enter a valid CVV.</p>}
//               </div>
//             </div>
//           </>
//         )}
        
//         {formData.paymentMethod === 'UPI' && (
//           <div className="mb-4">
//             <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">UPI ID</label>
//             <input
//               type="text"
//               id="upiId"
//               name="upiId"
//               value={formData.upiId}
//               onChange={handleChange}
//               className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.upiId ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.upiId && <p className="text-red-500 text-sm mt-1">Please enter a valid UPI ID.</p>}
//           </div>
//         )}
        
//         {formData.paymentMethod === 'COD' && (
//           <div className="mb-4">
//             <p className="text-gray-700">You have selected Cash on Delivery. No additional details are required.</p>
//           </div>
//         )}
        
//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//         >
//           Pay Now
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import CustomerNavbar from '../Navbar/CustomerNavbar';

// const PaymentForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     paymentMethod: 'Credit/Debit Card',
//     upiId: '',
//     address: '',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     email: false,
//     cardNumber: false,
//     expiryDate: false,
//     cvv: false,
//     upiId: false,
//     address: false,
//   });

//   const [cartTotal, setCartTotal] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCartTotal = async () => {
//       const cartId = sessionStorage.getItem('cartId');
//       if (cartId) {
//         try {
//           const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//           const cart = cartResponse.data;
//           if (cart && Array.isArray(cart.cartiem)) {
//             const total = cart.cartiem.reduce((sum, item) => sum + item.total, 0);
//             setCartTotal(total);
//           }
//         } catch (error) {
//           console.error('Error fetching cart total:', error);
//           toast.error('Failed to fetch cart total.');
//         }
//       }
//     };
//     fetchCartTotal();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePaymentMethodChange = (e) => {
//     setFormData({
//       ...formData,
//       paymentMethod: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {
//       name: formData.paymentMethod === 'Credit/Debit Card' && !formData.name,
//       email: formData.paymentMethod === 'Credit/Debit Card' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
//       cardNumber: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{16}$/.test(formData.cardNumber),
//       expiryDate: formData.paymentMethod === 'Credit/Debit Card' && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate),
//       cvv: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{3}$/.test(formData.cvv),
//       upiId: formData.paymentMethod === 'UPI' && !/^[a-zA-Z0-9@._-]+$/.test(formData.upiId),
//       address: !formData.address,
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).includes(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please correct the errors in the form.');
//       return;
//     }

//     const cartId = sessionStorage.getItem('cartId');
//     const custId = sessionStorage.getItem('custid');

//     if (!cartId || !custId) {
//       toast.error('Cart ID or Customer ID is missing.');
//       return;
//     }

//     try {
//       // Fetch cart details
//       const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//       const cart = cartResponse.data;

//       if (!cart || !Array.isArray(cart.cartiem)) {
//         toast.error('Invalid cart data.');
//         return;
//       }

//       // Create snapshot for each cart item
//       const snapshotPromises = cart.cartiem.map(item => {
//         const cartIdFromItem = item.cart ? item.cart.id : cartId;
//         const foodIdFromItem = item.food ? item.food.id : null;

//         if (!foodIdFromItem) {
//           console.warn('Skipping item due to missing food information:', item);
//           return null;
//         }

//         return axios.post('http://localhost:1234/carthistory/snapshot', null, {
//           params: {
//             cartId: cartIdFromItem,
//             foodId: foodIdFromItem,
//             total: item.total,
//             qty: item.qty,
//             paid: true,
//             customerId: custId,
//           },
//         });
//       }).filter(promise => promise !== null);

//       await Promise.all(snapshotPromises);

//       // Create order
//       const orderData = {
//         customer: { id: custId },
//         items: cart.cartiem.map(item => ({
//           cartId: item.cart ? item.cart.id : cartId,
//           foodId: item.food ? item.food.id : null,
//           total: item.total,
//           qty: item.qty,
//           paid: true,
//           customerId: custId,
//         })),
//         staff: null,
//         total: cartTotal,
//         deladdress: formData.address,
//         payment: formData.paymentMethod !== 'COD',
//         paymentmethod: formData.paymentMethod,
//         isAccepted: false,
//         orderdate: new Date().toISOString().slice(0, 10),
//         delstatus: 'Pending',
//         issuestatus: 'None',
//       };

//       const orderResponse = await axios.post('http://localhost:1234/orders', orderData);

//       if (orderResponse.data === 'Success') {
//         // Clear cart items using PUT method
//         const clearResponse = await axios.put('http://localhost:1234/simcart', {
//           id: cartId,
//         });

//         if (clearResponse.data === 'Success') {
//           toast.success('Payment processed and order created successfully!');
//           navigate('/success');
//         } else {
//           toast.error('Failed to clear cart items.');
//         }
//       } else {
//         toast.error('Failed to create order.');
//       }
//     } catch (error) {
//       console.error('Error during payment process:', error);
//       toast.error('An error occurred while processing the payment.');
//     }
//   };

//   return (
//     <>
//     <CustomerNavbar />
//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 border border-gray-300">
//       <h1 className="text-3xl font-bold text-center mb-6">Payment Details</h1>

//       {/* Order Summary */}
//       <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-sm">
//         <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
//         <p className="text-lg">Order Total: <span className="font-bold">₹{cartTotal}</span></p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Delivery Address */}
//         <div className="mb-6">
//           <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address</label>
//           <textarea
//             id="address"
//             name="address"
//             rows="4"
//             value={formData.address}
//             onChange={handleChange}
//             className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`} />
//           {errors.address && <p className="text-red-500 text-sm mt-1">Please enter the delivery address.</p>}
//         </div>

//         {/* Payment Method Selection */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700">Payment Method</label>
//           <div className="flex flex-col space-y-4">
//             <label className="inline-flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="Credit/Debit Card"
//                 checked={formData.paymentMethod === 'Credit/Debit Card'}
//                 onChange={handlePaymentMethodChange}
//                 className="form-radio hidden" />
//               <div className={`w-5 h-5 border-2 rounded-full ${formData.paymentMethod === 'Credit/Debit Card' ? 'bg-blue-500' : 'bg-white'} border-gray-300`} />
//               <span className="ml-2 text-lg">Credit/Debit Card</span>
//             </label>
//             <label className="inline-flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="UPI"
//                 checked={formData.paymentMethod === 'UPI'}
//                 onChange={handlePaymentMethodChange}
//                 className="form-radio hidden" />
//               <div className={`w-5 h-5 border-2 rounded-full ${formData.paymentMethod === 'UPI' ? 'bg-blue-500' : 'bg-white'} border-gray-300`} />
//               <span className="ml-2 text-lg">UPI</span>
//             </label>
//             <label className="inline-flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="COD"
//                 checked={formData.paymentMethod === 'COD'}
//                 onChange={handlePaymentMethodChange}
//                 className="form-radio hidden" />
//               <div className={`w-5 h-5 border-2 rounded-full ${formData.paymentMethod === 'COD' ? 'bg-blue-500' : 'bg-white'} border-gray-300`} />
//               <span className="ml-2 text-lg">Cash on Delivery</span>
//             </label>
//           </div>
//         </div>

//         {/* Payment Details */}
//         {formData.paymentMethod === 'Credit/Debit Card' && (
//           <>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name on Card</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
//               {errors.name && <p className="text-red-500 text-sm mt-1">Please enter the name on the card.</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
//               {errors.email && <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
//               <input
//                 type="text"
//                 id="cardNumber"
//                 name="cardNumber"
//                 value={formData.cardNumber}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`} />
//               {errors.cardNumber && <p className="text-red-500 text-sm mt-1">Please enter a valid card number.</p>}
//             </div>

//             <div className="flex gap-4 mb-4">
//               <div className="w-1/2">
//                 <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
//                 <input
//                   type="text"
//                   id="expiryDate"
//                   name="expiryDate"
//                   placeholder="MM/YY"
//                   value={formData.expiryDate}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`} />
//                 {errors.expiryDate && <p className="text-red-500 text-sm mt-1">Please enter a valid expiry date.</p>}
//               </div>

//               <div className="w-1/2">
//                 <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
//                 <input
//                   type="text"
//                   id="cvv"
//                   name="cvv"
//                   value={formData.cvv}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`} />
//                 {errors.cvv && <p className="text-red-500 text-sm mt-1">Please enter a valid CVV.</p>}
//               </div>
//             </div>
//           </>
//         )}

//         {formData.paymentMethod === 'UPI' && (
//           <div className="mb-4">
//             <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">UPI ID</label>
//             <input
//               type="text"
//               id="upiId"
//               name="upiId"
//               value={formData.upiId}
//               onChange={handleChange}
//               className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.upiId ? 'border-red-500' : 'border-gray-300'}`} />
//             {errors.upiId && <p className="text-red-500 text-sm mt-1">Please enter a valid UPI ID.</p>}
//           </div>
//         )}

//         {formData.paymentMethod === 'COD' && (
//           <div className="mb-4">
//             <p className="text-gray-700">You have selected Cash on Delivery. No additional details are required.</p>
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//         >
//           Pay Now
//         </button>
//       </form>
//     </div></>
//   );
// };

// export default PaymentForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import CustomerNavbar from '../Navbar/CustomerNavbar';

// const PaymentForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     paymentMethod: 'Credit/Debit Card',
//     upiId: '',
//     address: '',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     email: false,
//     cardNumber: false,
//     expiryDate: false,
//     cvv: false,
//     upiId: false,
//     address: false,
//   });

//   const [cartTotal, setCartTotal] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCartTotal = async () => {
//       const cartId = sessionStorage.getItem('cartId');
//       if (cartId) {
//         try {
//           const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//           const cart = cartResponse.data;
//           if (cart && Array.isArray(cart.cartiem)) {
//             const total = cart.cartiem.reduce((sum, item) => sum + item.total, 0);
//             setCartTotal(total);
//           }
//         } catch (error) {
//           console.error('Error fetching cart total:', error);
//           toast.error('Failed to fetch cart total.');
//         }
//       }
//     };
//     fetchCartTotal();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePaymentMethodChange = (e) => {
//     setFormData({
//       ...formData,
//       paymentMethod: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {
//       name: formData.paymentMethod === 'Credit/Debit Card' && !formData.name,
//       email: formData.paymentMethod === 'Credit/Debit Card' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
//       cardNumber: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{16}$/.test(formData.cardNumber),
//       expiryDate: formData.paymentMethod === 'Credit/Debit Card' && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate),
//       cvv: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{3}$/.test(formData.cvv),
//       upiId: formData.paymentMethod === 'UPI' && !/^[a-zA-Z0-9@._-]+$/.test(formData.upiId),
//       address: !formData.address,
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).includes(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please correct the errors in the form.');
//       return;
//     }

//     const cartId = sessionStorage.getItem('cartId');
//     const custId = sessionStorage.getItem('custid');

//     if (!cartId || !custId) {
//       toast.error('Cart ID or Customer ID is missing.');
//       return;
//     }

//     try {
//       const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//       const cart = cartResponse.data;

//       if (!cart || !Array.isArray(cart.cartiem)) {
//         toast.error('Invalid cart data.');
//         return;
//       }

//       const snapshotPromises = cart.cartiem.map(item => {
//         const cartIdFromItem = item.cart ? item.cart.id : cartId;
//         const foodIdFromItem = item.food ? item.food.id : null;

//         if (!foodIdFromItem) {
//           console.warn('Skipping item due to missing food information:', item);
//           return null;
//         }

//         return axios.post('http://localhost:1234/carthistory/snapshot', null, {
//           params: {
//             cartId: cartIdFromItem,
//             foodId: foodIdFromItem,
//             total: item.total,
//             qty: item.qty,
//             paid: true,
//             customerId: custId,
//           },
//         });
//       }).filter(promise => promise !== null);

//       await Promise.all(snapshotPromises);

//       const orderData = {
//         customer: { id: custId },
//         items: cart.cartiem.map(item => ({
//           cartId: item.cart ? item.cart.id : cartId,
//           foodId: item.food ? item.food.id : null,
//           total: item.total,
//           qty: item.qty,
//           paid: true,
//           customerId: custId,
//         })),
//         staff: null,
//         total: cartTotal,
//         deladdress: formData.address,
//         payment: formData.paymentMethod !== 'COD',
//         paymentmethod: formData.paymentMethod,
//         isAccepted: false,
//         orderdate: new Date().toISOString().slice(0, 10),
//         delstatus: 'Pending',
//         issuestatus: 'None',
//       };

//       const orderResponse = await axios.post('http://localhost:1234/orders', orderData);

//       if (orderResponse.data === 'Success') {
//         const clearResponse = await axios.put('http://localhost:1234/simcart', { id: cartId });

//         if (clearResponse.data === 'Success') {
//           toast.success('Payment processed and order created successfully!');
//           navigate('/homepage');
//         } else {
//           toast.error('Failed to clear cart items.');
//         }
//       } else {
//         toast.error('Failed to create order.');
//       }
//     } catch (error) {
//       console.error('Error during payment process:', error);
//       toast.error('An error occurred while processing the payment.');
//     }
//   };

//   return (
//     <>
//       <CustomerNavbar />
//       <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-300">
//         <h1 className="text-4xl font-bold text-center mb-6 text-red-600">Payment Details</h1>

//         {/* Order Summary */}
//         <div className="mb-8 p-4 bg-red-50 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-2 text-red-600">Order Summary</h2>
//           <p className="text-lg">Order Total: <span className="font-bold text-red-800">₹{cartTotal.toFixed(2)}</span></p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Delivery Address */}
//           <div className="bg-red-100 p-4 rounded-lg shadow-md">
//             <label htmlFor="address" className="block text-sm font-medium text-red-700">Delivery Address</label>
//             <textarea
//               id="address"
//               name="address"
//               rows="4"
//               value={formData.address}
//               onChange={handleChange}
//               className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.address && <p className="text-red-500 text-sm mt-1">Please enter the delivery address.</p>}
//           </div>

//           {/* Payment Method Selection */}
//           <div className="bg-red-100 p-4 rounded-lg shadow-md">
//             <label className="block text-sm font-medium text-red-700">Payment Method</label>
//             <div className="flex flex-col space-y-4">
//               {['Credit/Debit Card', 'UPI', 'COD'].map(method => (
//                 <label key={method} className="inline-flex items-center cursor-pointer">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value={method}
//                     checked={formData.paymentMethod === method}
//                     onChange={handlePaymentMethodChange}
//                     className="form-radio hidden"
//                   />
//                   <div className={`w-6 h-6 border-2 rounded-full ${formData.paymentMethod === method ? 'bg-red-600' : 'bg-white'} border-red-300`} />
//                   <span className="ml-2 text-lg text-red-600">{method}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Payment Details */}
//           {formData.paymentMethod === 'Credit/Debit Card' && (
//             <div className="bg-red-100 p-4 rounded-lg shadow-md">
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium text-red-700">Name on Card</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.name && <p className="text-red-500 text-sm mt-1">Please enter the name on the card.</p>}
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-medium text-red-700">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>}
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="cardNumber" className="block text-sm font-medium text-red-700">Card Number</label>
//                 <input
//                   type="text"
//                   id="cardNumber"
//                   name="cardNumber"
//                   value={formData.cardNumber}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.cardNumber && <p className="text-red-500 text-sm mt-1">Please enter a valid card number.</p>}
//               </div>

//               <div className="flex gap-4 mb-4">
//                 <div className="w-1/2">
//                   <label htmlFor="expiryDate" className="block text-sm font-medium text-red-700">Expiry Date</label>
//                   <input
//                     type="text"
//                     id="expiryDate"
//                     name="expiryDate"
//                     placeholder="MM/YY"
//                     value={formData.expiryDate}
//                     onChange={handleChange}
//                     className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.expiryDate && <p className="text-red-500 text-sm mt-1">Please enter a valid expiry date.</p>}
//                 </div>

//                 <div className="w-1/2">
//                   <label htmlFor="cvv" className="block text-sm font-medium text-red-700">CVV</label>
//                   <input
//                     type="text"
//                     id="cvv"
//                     name="cvv"
//                     value={formData.cvv}
//                     onChange={handleChange}
//                     className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.cvv && <p className="text-red-500 text-sm mt-1">Please enter a valid CVV.</p>}
//                 </div>
//               </div>
//             </div>
//           )}

//           {formData.paymentMethod === 'UPI' && (
//             <div className="bg-red-100 p-4 rounded-lg shadow-md">
//               <label htmlFor="upiId" className="block text-sm font-medium text-red-700">UPI ID</label>
//               <input
//                 type="text"
//                 id="upiId"
//                 name="upiId"
//                 value={formData.upiId}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.upiId ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.upiId && <p className="text-red-500 text-sm mt-1">Please enter a valid UPI ID.</p>}
//             </div>
//           )}

//           {formData.paymentMethod === 'COD' && (
//             <div className="bg-red-100 p-4 rounded-lg shadow-md">
//               <p className="text-red-700">You have selected Cash on Delivery. No additional details are required.</p>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//           >
//             Pay Now
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default PaymentForm;

// perfect code wihtout validations

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import CustomerNavbar from '../Navbar/CustomerNavbar';
// import { FaArrowLeft } from 'react-icons/fa';

// const PaymentForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     paymentMethod: 'Credit/Debit Card',
//     upiId: '',
//     address: '',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     email: false,
//     cardNumber: false,
//     expiryDate: false,
//     cvv: false,
//     upiId: false,
//     address: false,
//   });

//   const [cardType, setCardType] = useState('');
//   const [cartTotal, setCartTotal] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCartTotal = async () => {
//       const cartId = sessionStorage.getItem('cartId');
//       if (cartId) {
//         try {
//           const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//           const cart = cartResponse.data;
//           if (cart && Array.isArray(cart.cartiem)) {
//             const total = cart.cartiem.reduce((sum, item) => sum + item.total, 0);
//             setCartTotal(total);
//           }
//         } catch (error) {
//           console.error('Error fetching cart total:', error);
//           toast.error('Failed to fetch cart total.');
//         }
//       }
//     };
//     fetchCartTotal();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePaymentMethodChange = (e) => {
//     setFormData({
//       ...formData,
//       paymentMethod: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {
//       name: formData.paymentMethod === 'Credit/Debit Card' && !/^[a-zA-Z\s]+$/.test(formData.name),
//       email: formData.paymentMethod === 'Credit/Debit Card' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
//       cardNumber: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{16}$/.test(formData.cardNumber),
//       expiryDate: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{4}-\d{2}$/.test(formData.expiryDate),
//       cvv: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{3}$/.test(formData.cvv),
//       upiId: formData.paymentMethod === 'UPI' && !/^[a-zA-Z0-9@._-]+$/.test(formData.upiId),
//       address: !formData.address,
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).includes(true);
//   };

//   const detectCardType = (number) => {
//     // Add card type detection logic here
//     // For simplicity, we are using basic checks
//     if (/^4/.test(number)) return 'Visa';
//     if (/^5[1-5]/.test(number)) return 'MasterCard';
//     if (/^3[47]/.test(number)) return 'American Express';
//     return 'Unknown';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please correct the errors in the form.');
//       return;
//     }

//     setIsLoading(true);
//     setTimeout(async () => {
//       const cartId = sessionStorage.getItem('cartId');
//       const custId = sessionStorage.getItem('custid');

//       if (!cartId || !custId) {
//         toast.error('Cart ID or Customer ID is missing.');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//         const cart = cartResponse.data;

//         if (!cart || !Array.isArray(cart.cartiem)) {
//           toast.error('Invalid cart data.');
//           setIsLoading(false);
//           return;
//         }

//         const snapshotPromises = cart.cartiem.map(item => {
//           const cartIdFromItem = item.cart ? item.cart.id : cartId;
//           const foodIdFromItem = item.food ? item.food.id : null;

//           if (!foodIdFromItem) {
//             console.warn('Skipping item due to missing food information:', item);
//             return null;
//           }

//           return axios.post('http://localhost:1234/carthistory/snapshot', null, {
//             params: {
//               cartId: cartIdFromItem,
//               foodId: foodIdFromItem,
//               total: item.total,
//               qty: item.qty,
//               paid: true,
//               customerId: custId,
//             },
//           });
//         }).filter(promise => promise !== null);

//         await Promise.all(snapshotPromises);

//         const orderData = {
//           customer: { id: custId },
//           items: cart.cartiem.map(item => ({
//             cartId: item.cart ? item.cart.id : cartId,
//             foodId: item.food ? item.food.id : null,
//             total: item.total,
//             qty: item.qty,
//             paid: true,
//             customerId: custId,
//           })),
//           staff: null,
//           total: cartTotal,
//           deladdress: formData.address,
//           payment: formData.paymentMethod !== 'COD',
//           paymentmethod: formData.paymentMethod,
//           isAccepted: false,
//           orderdate: new Date().toISOString().slice(0, 10),
//           delstatus: 'Pending',
//           issuestatus: 'None',
//         };

//         const orderResponse = await axios.post('http://localhost:1234/orders', orderData);

//         if (orderResponse.data === 'Success') {
//           const clearResponse = await axios.put('http://localhost:1234/simcart', { id: cartId });

//           if (clearResponse.data === 'Success') {
//             setIsLoading(false);
//             navigate('/success'); // Redirect to success page
//           } else {
//             toast.error('Failed to clear cart items.');
//             setIsLoading(false);
//           }
//         } else {
//           toast.error('Failed to create order.');
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error('Error during payment process:', error);
//         toast.error('An error occurred while processing the payment.');
//         setIsLoading(false);
//       }
//     }, 1000); // 1 second delay
//   };

//   return (
//     <>
//       <CustomerNavbar />
//       <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-300">
//         <div className="flex items-center mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="text-red-600 hover:text-red-700 focus:outline-none"
//           >
//             <FaArrowLeft size={24} />
//           </button>
//           <h1 className="text-4xl font-bold text-center flex-grow text-red-600 ml-4">Payment Details</h1>
//         </div>

//         {/* Order Summary */}
//         <div className="mb-8 p-4 bg-red-50 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-2 text-red-600">Order Summary</h2>
//           <p className="text-lg">Order Total: <span className="font-bold text-red-800">₹{cartTotal.toFixed(2)}</span></p>
//         </div>

//         <div className="flex">
//           {/* Payment Method Selection */}
//           <div className="w-1/3 bg-red-100 p-4 rounded-lg shadow-md mr-4">
//             <h2 className="text-xl font-semibold mb-2 text-red-600">Select Payment Method</h2>
//             <div className="flex flex-col space-y-4">
//               {['Credit/Debit Card', 'UPI', 'COD'].map(method => (
//                 <label key={method} className="inline-flex items-center cursor-pointer">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value={method}
//                     checked={formData.paymentMethod === method}
//                     onChange={handlePaymentMethodChange}
//                     className="form-radio hidden"
//                   />
//                   <div className={`w-6 h-6 border-2 rounded-full ${formData.paymentMethod === method ? 'bg-red-600' : 'bg-white'} border-red-300`} />
//                   <span className="ml-2 text-lg text-red-600">{method}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Payment Details */}
//           <div className="w-2/3 bg-red-100 p-4 rounded-lg shadow-md">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Delivery Address */}
//               <div className="bg-red-200 p-4 rounded-lg shadow-md">
//                 <label htmlFor="address" className="block text-sm font-medium text-red-700">Delivery Address</label>
//                 <textarea
//                   id="address"
//                   name="address"
//                   rows="4"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.address && <p className="text-red-500 text-sm mt-1">Please enter the delivery address.</p>}
//               </div>

//               {formData.paymentMethod === 'Credit/Debit Card' && (
//                 <>
//                   <div className="mb-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-red-700">Name on Card</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//                     />
//                     {errors.name && <p className="text-red-500 text-sm mt-1">Please enter a valid name on the card (alphabets only).</p>}
//                   </div>

//                   <div className="mb-4">
//                     <label htmlFor="email" className="block text-sm font-medium text-red-700">Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                     />
//                     {errors.email && <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>}
//                   </div>

//                   <div className="mb-4">
//                     <label htmlFor="cardNumber" className="block text-sm font-medium text-red-700">Card Number</label>
//                     <input
//                       type="text"
//                       id="cardNumber"
//                       name="cardNumber"
//                       value={formData.cardNumber}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/\D/g, ''); // Only digits
//                         setFormData({
//                           ...formData,
//                           cardNumber: value,
//                         });
//                         setCardType(detectCardType(value));
//                       }}
//                       maxLength="16"
//                       className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
//                     />
//                     {cardType && <p className="text-red-500 text-sm mt-1">Card Type: {cardType}</p>}
//                     {errors.cardNumber && <p className="text-red-500 text-sm mt-1">Please enter a valid 16-digit card number.</p>}
//                   </div>

//                   <div className="flex gap-4 mb-4">
//                     <div className="w-1/2">
//                       <label htmlFor="expiryDate" className="block text-sm font-medium text-red-700">Expiry Date</label>
//                       <input
//                         type="month"
//                         id="expiryDate"
//                         name="expiryDate"
//                         value={formData.expiryDate}
//                         onChange={handleChange}
//                         min={new Date().toISOString().slice(0, 7)}
//                         className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
//                       />
//                       {errors.expiryDate && <p className="text-red-500 text-sm mt-1">Please enter a valid expiry date.</p>}
//                     </div>

//                     <div className="w-1/2">
//                       <label htmlFor="cvv" className="block text-sm font-medium text-red-700">CVV</label>
//                       <input
//                         type="password"
//                         id="cvv"
//                         name="cvv"
//                         value={formData.cvv}
//                         onChange={handleChange}
//                         maxLength="3"
//                         className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
//                       />
//                       {errors.cvv && <p className="text-red-500 text-sm mt-1">Please enter a valid 3-digit CVV.</p>}
//                     </div>
//                   </div>
//                 </>
//               )}

//               {formData.paymentMethod === 'UPI' && (
//                 <div className="mb-4">
//                   <label htmlFor="upiId" className="block text-sm font-medium text-red-700">UPI ID</label>
//                   <input
//                     type="text"
//                     id="upiId"
//                     name="upiId"
//                     value={formData.upiId}
//                     onChange={handleChange}
//                     className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.upiId ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.upiId && <p className="text-red-500 text-sm mt-1">Please enter a valid UPI ID.</p>}
//                 </div>
//               )}

//               {formData.paymentMethod === 'COD' && (
//                 <div className="mb-4">
//                   <p className="text-red-700">You have selected Cash on Delivery. No additional details are required.</p>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//               >
//                 {isLoading ? 'Processing...' : 'Pay Now'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {isLoading && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <div className="flex items-center justify-center">
//               <svg className="animate-spin h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>
//               </svg>
//             </div>
//             <p className="text-center text-red-600 mt-4">Processing Payment...</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PaymentForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import CustomerNavbar from '../Navbar/CustomerNavbar';
// import { FaArrowLeft } from 'react-icons/fa';

// const PaymentForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobileNumber: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     paymentMethod: 'Credit/Debit Card',
//     upiId: '',
//     address: '',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     email: false,
//     mobileNumber: false,
//     cardNumber: false,
//     expiryDate: false,
//     cvv: false,
//     upiId: false,
//     address: false,
//   });

//   const [cardType, setCardType] = useState('');
//   const [cartTotal, setCartTotal] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCartTotal = async () => {
//       const cartId = sessionStorage.getItem('cartId');
//       if (cartId) {
//         try {
//           const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//           const cart = cartResponse.data;
//           if (cart && Array.isArray(cart.cartiem)) {
//             const total = cart.cartiem.reduce((sum, item) => sum + item.total, 0);
//             setCartTotal(total);
//           }
//         } catch (error) {
//           console.error('Error fetching cart total:', error);
//           toast.error('Failed to fetch cart total.');
//         }
//       }
//     };
//     fetchCartTotal();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePaymentMethodChange = (e) => {
//     setFormData({
//       ...formData,
//       paymentMethod: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {
//       name: formData.paymentMethod === 'Credit/Debit Card' && !/^[a-zA-Z\s]+$/.test(formData.name),
//       email: formData.paymentMethod === 'Credit/Debit Card' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
//       mobileNumber: !/^\d{10}$/.test(formData.mobileNumber),
//       cardNumber: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{16}$/.test(formData.cardNumber),
//       expiryDate: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{4}-\d{2}$/.test(formData.expiryDate),
//       cvv: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{3}$/.test(formData.cvv),
//       upiId: formData.paymentMethod === 'UPI' && !/^[a-zA-Z0-9@._-]+$/.test(formData.upiId),
//       address: !formData.address,
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).includes(true);
//   };

//   const detectCardType = (number) => {
//     if (/^4/.test(number)) return 'Visa';
//     if (/^5[1-5]/.test(number)) return 'MasterCard';
//     if (/^3[47]/.test(number)) return 'American Express';
//     return 'Unknown';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please correct the errors in the form.');
//       return;
//     }

//     setIsLoading(true);
//     setTimeout(async () => {
//       const cartId = sessionStorage.getItem('cartId');
//       const custId = sessionStorage.getItem('custid');

//       if (!cartId || !custId) {
//         toast.error('Cart ID or Customer ID is missing.');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//         const cart = cartResponse.data;

//         if (!cart || !Array.isArray(cart.cartiem)) {
//           toast.error('Invalid cart data.');
//           setIsLoading(false);
//           return;
//         }

//         const snapshotPromises = cart.cartiem.map(item => {
//           const cartIdFromItem = item.cart ? item.cart.id : cartId;
//           const foodIdFromItem = item.food ? item.food.id : null;

//           if (!foodIdFromItem) {
//             console.warn('Skipping item due to missing food information:', item);
//             return null;
//           }

//           return axios.post('http://localhost:1234/carthistory/snapshot', null, {
//             params: {
//               cartId: cartIdFromItem,
//               foodId: foodIdFromItem,
//               total: item.total,
//               qty: item.qty,
//               paid: true,
//               customerId: custId,
//             },
//           });
//         }).filter(promise => promise !== null);

//         await Promise.all(snapshotPromises);

//         const orderData = {
//           customer: { id: custId },
//           items: cart.cartiem.map(item => ({
//             cartId: item.cart ? item.cart.id : cartId,
//             foodId: item.food ? item.food.id : null,
//             total: item.total,
//             qty: item.qty,
//             paid: true,
//             customerId: custId,
//           })),
//           staff: null,
//           total: cartTotal,
//           deladdress: formData.address,
//           mobileNumber: formData.mobileNumber,
//           payment: formData.paymentMethod !== 'COD',
//           paymentmethod: formData.paymentMethod,
//           isAccepted: false,
//           orderdate: new Date().toISOString().slice(0, 10),
//           delstatus: 'Pending',
//           issuestatus: 'None',
//         };

//         const orderResponse = await axios.post('http://localhost:1234/orders', orderData);

//         if (orderResponse.data === 'Success') {
//           const clearResponse = await axios.put('http://localhost:1234/simcart', { id: cartId });

//           if (clearResponse.data === 'Success') {
//             setIsLoading(false);
//             navigate('/homepage');
//             toast.success("Order Placed Successfully!")
//           } else {
//             toast.error('Failed to clear cart items.');
//             setIsLoading(false);
//           }
//         } else {
//           toast.error('Failed to create order.');
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error('Error during payment process:', error);
//         toast.error('An error occurred while processing the payment.');
//         setIsLoading(false);
//       }
//     }, 1000); // 1 second delay
//   };

//   return (
//     <>
//       <CustomerNavbar />
//       <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-300">
//         <div className="flex items-center mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="text-red-600 hover:text-red-700 focus:outline-none"
//           >
//             <FaArrowLeft size={24} />
//           </button>
//           <h1 className="text-4xl font-bold text-center flex-grow text-red-600 ml-4">Payment Details</h1>
//         </div>

//         {/* Order Summary */}
//         <div className="mb-8 p-4 bg-red-50 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-2 text-red-600">Order Summary</h2>
//           <p className="text-lg">Order Total: <span className="font-bold text-red-800">₹{cartTotal.toFixed(2)}</span></p>
//         </div>

//         <div className="flex">
//           {/* Payment Method Selection */}
//           <div className="w-1/3 bg-red-100 p-4 rounded-lg shadow-md mr-4">
//             <h2 className="text-xl font-semibold mb-2 text-red-600">Select Payment Method</h2>
//             <div className="flex flex-col space-y-4">
//               {['Credit/Debit Card', 'UPI', 'COD'].map(method => (
//                 <label key={method} className="inline-flex items-center cursor-pointer">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value={method}
//                     checked={formData.paymentMethod === method}
//                     onChange={handlePaymentMethodChange}
//                     className="form-radio hidden"
//                   />
//                   <div className={`w-6 h-6 border-2 rounded-full ${formData.paymentMethod === method ? 'bg-red-600' : 'bg-white'} border-red-300`} />
//                   <span className="ml-2 text-lg text-red-600">{method}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Payment Details */}
//           <div className="w-2/3 bg-red-50 p-4 rounded-lg shadow-md">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Delivery Address */}
//               <div className="bg-red-200 p-4 rounded-lg shadow-md">
//                 <label htmlFor="address" className="block text-sm font-medium text-red-700">Delivery Address</label>
//                 <textarea
//                   id="address"
//                   name="address"
//                   rows="4"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.address && <p className="text-red-500 text-sm mt-1">Please enter the delivery address.</p>}
//               </div>

//               {/* Mobile Number */}
//               <div className="mb-4">
//                 <label htmlFor="mobileNumber" className="block text-sm font-medium text-red-700">Mobile Number</label>
//                 <input
//                   type="text"
//                   id="mobileNumber"
//                   name="mobileNumber"
//                   value={formData.mobileNumber}
//                   onChange={handleChange}
//                   maxLength="10"
//                   className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">Please enter a valid 10-digit mobile number.</p>}
//               </div>

//               {formData.paymentMethod === 'Credit/Debit Card' && (
//                 <>
//                   <div className="mb-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-red-700">Name on Card</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//                     />
//                     {errors.name && <p className="text-red-500 text-sm mt-1">Please enter a valid name on the card (alphabets only).</p>}
//                   </div>

//                   {/* <div className="mb-4">
//                     <label htmlFor="email" className="block text-sm font-medium text-red-700">Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                     />
//                     {errors.email && <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>}
//                   </div> */}

//                   <div className="mb-4">
//                     <label htmlFor="cardNumber" className="block text-sm font-medium text-red-700">Card Number</label>
//                     <input
//                       type="text"
//                       id="cardNumber"
//                       name="cardNumber"
//                       value={formData.cardNumber}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/\D/g, ''); // Only digits
//                         setFormData({
//                           ...formData,
//                           cardNumber: value,
//                         });
//                         setCardType(detectCardType(value));
//                       }}
//                       maxLength="16"
//                       className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
//                     />
//                     {cardType && <p className="text-red-500 text-sm mt-1">Card Type: {cardType}</p>}
//                     {errors.cardNumber && <p className="text-red-500 text-sm mt-1">Please enter a valid 16-digit card number.</p>}
//                   </div>

//                   <div className="flex gap-4 mb-4">
//                     <div className="w-1/2">
//                       <label htmlFor="expiryDate" className="block text-sm font-medium text-red-700">Expiry Date</label>
//                       <input
//                         type="month"
//                         id="expiryDate"
//                         name="expiryDate"
//                         value={formData.expiryDate}
//                         onChange={handleChange}
//                         min={new Date().toISOString().slice(0, 7)}
//                         max={`${new Date().getFullYear() + 20}-12`}
//                         className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
//                       />
//                       {errors.expiryDate && <p className="text-red-500 text-sm mt-1">Please enter a valid expiry date.</p>}
//                     </div>

//                     <div className="w-1/2">
//                       <label htmlFor="cvv" className="block text-sm font-medium text-red-700">CVV</label>
//                       <input
//                         type="password"
//                         id="cvv"
//                         name="cvv"
//                         value={formData.cvv}
//                         onChange={handleChange}
//                         maxLength="3"
//                         className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
//                       />
//                       {errors.cvv && <p className="text-red-500 text-sm mt-1">Please enter a valid 3-digit CVV.</p>}
//                     </div>
//                   </div>
//                 </>
//               )}

//               {formData.paymentMethod === 'UPI' && (
//                 <div className="mb-4">
//                   <label htmlFor="upiId" className="block text-sm font-medium text-red-700">UPI ID</label>
//                   <input
//                     type="text"
//                     id="upiId"
//                     name="upiId"
//                     value={formData.upiId}
//                     onChange={handleChange}
//                     className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.upiId ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.upiId && <p className="text-red-500 text-sm mt-1">Please enter a valid UPI ID.</p>}
//                 </div>
//               )}

//               {formData.paymentMethod === 'COD' && (
//                 <div className="mb-4">
//                   <p className="text-red-700">You have selected Cash on Delivery. No additional details are required.</p>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//               >
//                 {isLoading ? 'Processing...' : 'Pay Now'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {isLoading && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <div className="flex items-center justify-center">
//               <svg className="animate-spin h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>
//               </svg>
//             </div>
//             <p className="text-center text-red-600 mt-4">Processing Payment...</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PaymentForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import CustomerNavbar from '../Navbar/CustomerNavbar';
// import { FaArrowLeft } from 'react-icons/fa';

// const PaymentForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobileNumber: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     paymentMethod: 'Credit/Debit Card',
//     upiId: '',
//     address: '',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     email: false,
//     mobileNumber: false,
//     cardNumber: false,
//     expiryDate: false,
//     cvv: false,
//     upiId: false,
//     address: false,
//   });

//   const [cardType, setCardType] = useState('');
//   const [cartTotal, setCartTotal] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCartTotal = async () => {
//       const cartId = sessionStorage.getItem('cartId');
//       if (cartId) {
//         try {
//           const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//           const cart = cartResponse.data;
//           if (cart && Array.isArray(cart.cartiem)) {
//             const total = cart.cartiem.reduce((sum, item) => sum + item.total, 0);
//             setCartTotal(total);
//           }
//         } catch (error) {
//           console.error('Error fetching cart total:', error);
//           toast.error('Failed to fetch cart total.');
//         }
//       }
//     };
//     fetchCartTotal();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePaymentMethodChange = (e) => {
//     setFormData({
//       ...formData,
//       paymentMethod: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {
//       name: formData.paymentMethod === 'Credit/Debit Card' && !/^[a-zA-Z\s]+$/.test(formData.name),
//       email: formData.paymentMethod === 'Credit/Debit Card' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
//       mobileNumber: !/^\d{10}$/.test(formData.mobileNumber),
//       cardNumber: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{16}$/.test(formData.cardNumber),
//       expiryDate: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{4}-\d{2}$/.test(formData.expiryDate),
//       cvv: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{3}$/.test(formData.cvv),
//       upiId: formData.paymentMethod === 'UPI' && !/^[a-zA-Z0-9@._-]+$/.test(formData.upiId),
//       address: !formData.address,
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).includes(true);
//   };

//   const detectCardType = (number) => {
//     if (/^4/.test(number)) return 'Visa';
//     if (/^5[1-5]/.test(number)) return 'MasterCard';
//     if (/^3[47]/.test(number)) return 'American Express';
//     return 'Unknown';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please correct the errors in the form.');
//       return;
//     }

//     setIsLoading(true);
//     setTimeout(async () => {
//       const cartId = sessionStorage.getItem('cartId');
//       const custId = sessionStorage.getItem('custid');

//       if (!cartId || !custId) {
//         toast.error('Cart ID or Customer ID is missing.');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//         const cart = cartResponse.data;

//         if (!cart || !Array.isArray(cart.cartiem)) {
//           toast.error('Invalid cart data.');
//           setIsLoading(false);
//           return;
//         }

//         const snapshotPromises = cart.cartiem.map(item => {
//           const cartIdFromItem = item.cart ? item.cart.id : cartId;
//           const foodIdFromItem = item.food ? item.food.id : null;

//           if (!foodIdFromItem) {
//             console.warn('Skipping item due to missing food information:', item);
//             return null;
//           }

//           return axios.post('http://localhost:1234/carthistory/snapshot', null, {
//             params: {
//               cartId: cartIdFromItem,
//               foodId: foodIdFromItem,
//               total: item.total,
//               qty: item.qty,
//               paid: true,
//               customerId: custId,
//             },
//           });
//         }).filter(promise => promise !== null);

//         await Promise.all(snapshotPromises);

//         const orderData = {
//           customer: { id: custId },
//           items: cart.cartiem.map(item => ({
//             cartId: item.cart ? item.cart.id : cartId,
//             foodId: item.food ? item.food.id : null,
//             total: item.total,
//             qty: item.qty,
//             paid: true,
//             customerId: custId,
//           })),
//           staff: null,
//           total: cartTotal,
//           deladdress: formData.address,
//           mobileNumber: formData.mobileNumber,
//           payment: formData.paymentMethod !== 'COD',
//           paymentmethod: formData.paymentMethod,
//           isAccepted: false,
//           orderdate: new Date().toISOString().slice(0, 10),
//           delstatus: 'Pending',
//           issuestatus: 'None',
//         };

//         const orderResponse = await axios.post('http://localhost:1234/orders', orderData);

//         if (orderResponse.data === 'Success') {
//           const clearResponse = await axios.put('http://localhost:1234/simcart', { id: cartId });

//           if (clearResponse.data === 'Success') {
//             setIsLoading(false);
//             navigate('/success'); // Redirect to success page
//           } else {
//             toast.error('Failed to clear cart items.');
//             setIsLoading(false);
//           }
//         } else {
//           toast.error('Failed to create order.');
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error('Error during payment process:', error);
//         toast.error('An error occurred while processing the payment.');
//         setIsLoading(false);
//       }
//     }, 1000); // 1 second delay
//   };

//   return (
//     <>
//       <CustomerNavbar />
//       <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-300">
//         <div className="flex items-center mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="text-red-600 hover:text-red-700 focus:outline-none"
//           >
//             <FaArrowLeft size={24} />
//           </button>
//           <h1 className="text-4xl font-bold text-center flex-grow text-red-600 ml-4">Payment Details</h1>
//         </div>

//         {/* Order Summary */}
//         <div className="mb-8 p-4 bg-red-50 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-2 text-red-600">Order Summary</h2>
//           <p className="text-lg">Order Total: <span className="font-bold text-red-800">₹{cartTotal.toFixed(2)}</span></p>
//         </div>

//         <div className="flex">
//           {/* Payment Method Selection */}
//           <div className="w-1/3 bg-red-100 p-4 rounded-lg shadow-md mr-4">
//             <h2 className="text-xl font-semibold mb-2 text-red-600">Select Payment Method</h2>
//             <div className="flex flex-col space-y-4">
//               {['Credit/Debit Card', 'UPI', 'COD'].map(method => (
//                 <label key={method} className="inline-flex items-center cursor-pointer">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value={method}
//                     checked={formData.paymentMethod === method}
//                     onChange={handlePaymentMethodChange}
//                     className="form-radio hidden"
//                   />
//                   <div className={`w-6 h-6 border-2 rounded-full ${formData.paymentMethod === method ? 'bg-red-600' : 'bg-white'} border-red-300`} />
//                   <span className="ml-2 text-lg text-red-600">{method}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Payment Details */}
//           <div className="w-2/3 bg-red-50 p-4 rounded-lg shadow-md">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Delivery Address */}
//               <div className="bg-red-200 p-4 rounded-lg shadow-md">
//                 <label htmlFor="address" className="block text-sm font-medium text-red-700">Delivery Address</label>
//                 <textarea
//                   id="address"
//                   name="address"
//                   rows="4"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.address && <p className="text-red-500 text-sm mt-1">Please enter the delivery address.</p>}
//               </div>

//               {/* Mobile Number */}
//               <div className="mb-4">
//                 <label htmlFor="mobileNumber" className="block text-sm font-medium text-red-700">Mobile Number</label>
//                 <input
//                   type="text"
//                   id="mobileNumber"
//                   name="mobileNumber"
//                   value={formData.mobileNumber}
//                   onChange={handleChange}
//                   maxLength="10"
//                   className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">Please enter a valid 10-digit mobile number.</p>}
//               </div>

//               {formData.paymentMethod === 'Credit/Debit Card' && (
//                 <>
//                   <div className="mb-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-red-700">Name on Card</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//                     />
//                     {errors.name && <p className="text-red-500 text-sm mt-1">Please enter a valid name on the card (alphabets only).</p>}
//                   </div>

//                   <div className="mb-4">
//                     <label htmlFor="email" className="block text-sm font-medium text-red-700">Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                     />
//                     {errors.email && <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>}
//                   </div>

//                   <div className="mb-4">
//                     <label htmlFor="cardNumber" className="block text-sm font-medium text-red-700">Card Number</label>
//                     <input
//                       type="text"
//                       id="cardNumber"
//                       name="cardNumber"
//                       value={formData.cardNumber}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/\D/g, ''); // Only digits
//                         setFormData({
//                           ...formData,
//                           cardNumber: value,
//                         });
//                         setCardType(detectCardType(value));
//                       }}
//                       maxLength="16"
//                       className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
//                     />
//                     {cardType && <p className="text-red-500 text-sm mt-1">Card Type: {cardType}</p>}
//                     {errors.cardNumber && <p className="text-red-500 text-sm mt-1">Please enter a valid 16-digit card number.</p>}
//                   </div>

//                   <div className="flex gap-4 mb-4">
//                     <div className="w-1/2">
//                       <label htmlFor="expiryDate" className="block text-sm font-medium text-red-700">Expiry Date</label>
//                       <input
//                         type="month"
//                         id="expiryDate"
//                         name="expiryDate"
//                         value={formData.expiryDate}
//                         onChange={handleChange}
//                         min={new Date().toISOString().slice(0, 7)}
//                         max={`${new Date().getFullYear() + 20}-12`}
//                         className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
//                       />
//                       {errors.expiryDate && <p className="text-red-500 text-sm mt-1">Please enter a valid expiry date.</p>}
//                     </div>

//                     <div className="w-1/2">
//                       <label htmlFor="cvv" className="block text-sm font-medium text-red-700">CVV</label>
//                       <input
//                         type="password"
//                         id="cvv"
//                         name="cvv"
//                         value={formData.cvv}
//                         onChange={handleChange}
//                         maxLength="3"
//                         className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
//                       />
//                       {errors.cvv && <p className="text-red-500 text-sm mt-1">Please enter a valid 3-digit CVV.</p>}
//                     </div>
//                   </div>
//                 </>
//               )}

//               {formData.paymentMethod === 'UPI' && (
//                 <div className="mb-4">
//                   <label htmlFor="upiId" className="block text-sm font-medium text-red-700">UPI ID</label>
//                   <input
//                     type="text"
//                     id="upiId"
//                     name="upiId"
//                     value={formData.upiId}
//                     onChange={handleChange}
//                     className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.upiId ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.upiId && <p className="text-red-500 text-sm mt-1">Please enter a valid UPI ID.</p>}
//                 </div>
//               )}

//               {formData.paymentMethod === 'COD' && (
//                 <div className="mb-4">
//                   <p className="text-red-700">You have selected Cash on Delivery. No additional details are required.</p>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//               >
//                 {isLoading ? 'Processing...' : 'Pay Now'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {isLoading && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <div className="flex items-center justify-center">
//               <svg className="animate-spin h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>
//               </svg>
//             </div>
//             <p className="text-center text-red-600 mt-4">Processing Payment...</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PaymentForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomerNavbar from '../Navbar/CustomerNavbar';
import { FaArrowLeft } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfMonth, endOfMonth, addMonths } from 'date-fns';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    cardNumber: '',
    expiryDate: new Date(),
    cvv: '',
    paymentMethod: 'Credit/Debit Card',
    upiId: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    mobileNumber: false,
    cardNumber: false,
    expiryDate: false,
    cvv: false,
    upiId: false,
    address: false,
  });

  const [cardType, setCardType] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const minDate = startOfMonth(new Date()); // Start of the current month
  const maxDate = endOfMonth(addMonths(minDate, 12)); // End of the current month plus 12 months

  useEffect(() => {
    const fetchCartTotal = async () => {
      const cartId = sessionStorage.getItem('cartId');
      if (cartId) {
        try {
          const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
          const cart = cartResponse.data;
          if (cart && Array.isArray(cart.cartiem)) {
            const total = cart.cartiem.reduce((sum, item) => sum + item.total, 0);
            setCartTotal(total);
          }
        } catch (error) {
          console.error('Error fetching cart total:', error);
          toast.error('Failed to fetch cart total.');
        }
      }
    };
    fetchCartTotal();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'cardNumber') {
      const cardNumber = value.replace(/\D/g, ''); // Only digits
      setCardType(detectCardType(cardNumber));
    }
  };

  const handlePaymentMethodChange = (e) => {
    setFormData({
      ...formData,
      paymentMethod: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.paymentMethod === 'Credit/Debit Card' && !/^[a-zA-Z\s]+$/.test(formData.name),
      mobileNumber: !/^\d{10}$/.test(formData.mobileNumber),
      cardNumber: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{16}$/.test(formData.cardNumber),
      expiryDate: formData.paymentMethod === 'Credit/Debit Card' && !isValidExpiryDate(formData.expiryDate),
      cvv: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{3}$/.test(formData.cvv),
      upiId: formData.paymentMethod === 'UPI' && !/^[a-zA-Z0-9@._-]+$/.test(formData.upiId),
      address: !formData.address,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const isValidExpiryDate = (date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 1 || month > 12) return false;
    if (year < currentYear) return false;

    return true;
  };

  const detectCardType = (number) => {
    if (/^4/.test(number)) return 'Visa';
    if (/^5[1-5]/.test(number)) return 'MasterCard';
    if (/^3[47]/.test(number)) return 'American Express';
    return 'Unknown';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please correct the errors in the form.');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      const cartId = sessionStorage.getItem('cartId');
      const custId = sessionStorage.getItem('custid');

      if (!cartId || !custId) {
        toast.error('Cart ID or Customer ID is missing.');
        setIsLoading(false);
        return;
      }

      try {
        const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
        const cart = cartResponse.data;

        if (!cart || !Array.isArray(cart.cartiem)) {
          toast.error('Invalid cart data.');
          setIsLoading(false);
          return;
        }

        const snapshotPromises = cart.cartiem.map(item => {
          const cartIdFromItem = item.cart ? item.cart.id : cartId;
          const foodIdFromItem = item.food ? item.food.id : null;

          if (!foodIdFromItem) {
            console.warn('Skipping item due to missing food information:', item);
            return null;
          }

          return axios.post('http://localhost:1234/carthistory/snapshot', null, {
            params: {
              cartId: cartIdFromItem,
              foodId: foodIdFromItem,
              total: item.total,
              qty: item.qty,
              paid: true,
              customerId: custId,
            },
          });
        }).filter(promise => promise !== null);

        await Promise.all(snapshotPromises);

        const orderData = {
          customer: { id: custId },
          items: cart.cartiem.map(item => ({
            cartId: item.cart ? item.cart.id : cartId,
            foodId: item.food ? item.food.id : null,
            total: item.total,
            qty: item.qty,
            paid: true,
            customerId: custId,
          })),
          staff: null,
          total: cartTotal,
          deladdress: formData.address,
          mobileNumber: formData.mobileNumber,
          payment: formData.paymentMethod !== 'COD',
          paymentmethod: formData.paymentMethod,
          isAccepted: false,
          orderdate: new Date().toISOString().slice(0, 10),
          delstatus: 'Pending',
          issuestatus: 'None',
        };

        const orderResponse = await axios.post('http://localhost:1234/orders', orderData);

        if (orderResponse.data === 'Success') {
          const clearResponse = await axios.put('http://localhost:1234/simcart', { id: cartId });

          if (clearResponse.data === 'Success') {
            setIsLoading(false);
            navigate('/homepage');
          } else {
            toast.error('Failed to clear cart items.');
            setIsLoading(false);
          }
        } else {
          toast.error('Failed to create order.');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error during payment process:', error);
        toast.error('An error occurred while processing the payment.');
        setIsLoading(false);
      }
    }, 1000); // 1 second delay
  };

  return (
    <>
      <CustomerNavbar />
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-300">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-red-600 hover:text-red-700 focus:outline-none"
          >
            <FaArrowLeft size={24} />
          </button>
          <h1 className="text-4xl font-bold text-center flex-grow text-red-600 ml-4">Payment Details</h1>
        </div>

        {/* Order Summary */}
        <div className="mb-8 p-4 bg-red-50 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Order Summary</h2>
          <p className="text-lg">Order Total: <span className="font-bold text-red-800">₹{cartTotal.toFixed(2)}</span></p>
        </div>

        <div className="flex">
          {/* Payment Method Selection */}
          <div className="w-1/3 bg-red-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Payment Method</h2>
            {['Credit/Debit Card', 'UPI', 'COD'].map((method) => (
              <label key={method} className="block mb-2">
                <input
                  type="radio"
                  id={method}
                  name="paymentMethod"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={handlePaymentMethodChange}
                  className="form-radio text-red-600"
                />
                <span className="ml-2 text-red-700">{method}</span>
              </label>
            ))}
          </div>

          {/* Payment Details */}
          <div className="w-2/3 bg-red-50 p-4 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Address */}
              <div className="bg-red-200 p-4 rounded-lg shadow-md">
                <label htmlFor="address" className="block text-sm font-medium text-red-700">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">Please enter the delivery address.</p>}
              </div>

              {/* Mobile Number */}
              <div className="mb-4">
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-red-700">Mobile Number</label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  maxLength="10"
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">Please enter a valid 10-digit mobile number.</p>}
              </div>

              {formData.paymentMethod === 'Credit/Debit Card' && (
                <>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-red-700">Name on Card</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">Please enter a valid name on the card (alphabets only).</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-red-700">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      maxLength="16"
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {cardType && (
                      <p className="bg-red-600 text-white text-sm mt-1 px-2 py-1 rounded">
                        Card Type: {cardType}
                      </p>
                    )}
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">Please enter a valid 16-digit card number.</p>}
                  </div>

                  <div className="flex gap-4 mb-4">
                    <div className="w-1/2">
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-red-700">Expiry Date</label>
                      <DatePicker
                        selected={formData.expiryDate}
                        onChange={(date) => setFormData({ ...formData, expiryDate: date })}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        minDate={minDate}
                        maxDate={maxDate}
                        placeholderText="Select Expiry Date"
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm mt-1">Please enter a valid expiry date (MM/YY).</p>}
                    </div>

                    <div className="w-1/2">
                      <label htmlFor="cvv" className="block text-sm font-medium text-red-700">CVV</label>
                      <input
                        type="password"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        maxLength="3"
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">Please enter a valid 3-digit CVV.</p>}
                    </div>
                  </div>
                </>
              )}

              {formData.paymentMethod === 'UPI' && (
                <div className="mb-4">
                  <label htmlFor="upiId" className="block text-sm font-medium text-red-700">UPI ID</label>
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.upiId ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.upiId && <p className="text-red-500 text-sm mt-1">Please enter a valid UPI ID.</p>}
                </div>
              )}

              {formData.paymentMethod === 'COD' && (
                <div className="mb-4">
                  <p className="text-red-700">You have selected Cash on Delivery. No additional details are required.</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                {isLoading ? 'Processing...' : 'Pay Now'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>
              </svg>
            </div>
            <p className="text-center text-red-600 mt-4">Processing Payment...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
