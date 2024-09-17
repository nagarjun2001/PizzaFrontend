// import React, { useState } from 'react';

// const PaymentForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     paymentMethod: 'Credit/Debit Card',
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     email: false,
//     cardNumber: false,
//     expiryDate: false,
//     cvv: false,
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
//       name: !formData.name,
//       email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
//       cardNumber: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{16}$/.test(formData.cardNumber),
//       expiryDate: formData.paymentMethod === 'Credit/Debit Card' && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate),
//       cvv: formData.paymentMethod === 'Credit/Debit Card' && !/^\d{3}$/.test(formData.cvv),
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).includes(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const cartId = sessionStorage.getItem('cartId');
//       const custId = sessionStorage.getItem('custid');
//       const amount = 100;
//       const paymentDate = new Date().toISOString();
//       const status = 'Success';
      
//       const requestData = {
//         orders: {
//           id: cartId,
//           customer: {
//             id: parseInt(custId, 10)
//           },
//           cart: [
//             {
//               id: parseInt(cartId, 10)
//             }
//           ],
//           isAccepted: true
//         },
//         amount,
//         paymentMethod: formData.paymentMethod,
//         paymentDate,
//         status
//       };

//       try {
//         const response = await fetch('http://localhost:1234/payment', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(requestData)
//         });

//         if (response.ok) {
//           alert('Payment details submitted successfully!');
//         } else {
//           alert('Failed to submit payment details.');
//         }
//       } catch (error) {
//         console.error('Error submitting payment details:', error);
//         alert('An error occurred while submitting payment details.');
//       }
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
//               value={formData.upiId || ''}
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
//           Submit Payment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

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

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

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
//     if (validateForm()) {
//       const cartId = sessionStorage.getItem('cartId');
//       const custId = sessionStorage.getItem('custid');

//       if (!cartId || !custId) {
//         setError('Cart ID or Customer ID is missing.');
//         return;
//       }

//       try {
//         // Fetch cart details
//         console.log(`Fetching cart details from: http://localhost:1234/simcart/cart/${cartId}`);
//         const cartResponse = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//         const cart = cartResponse.data;

//         // Create snapshots for each cart item
//         const snapshotPromises = cart.cartiem.map(item =>
//           axios.post('http://localhost:1234/carthistory/snapshot', null, {
//             params: {
//               cartId: cart.id,
//               foodId: item.food.id,
//               total: item.total,
//               qty: item.qty,
//               paid: true,
//               customerId: custId,
//             },
//           })
//         );

//         await Promise.all(snapshotPromises);

//         // Clear cart items
//         console.log(`Clearing cart items from: http://localhost:1234/simcart/clear/${cartId}`);
//         await axios.put(`http://localhost:1234/simcart/clear/${cartId}`);

//         toast.success('Payment processed successfully!');
//         navi("/homepage")
//       } catch (error) {
//         console.error('Error fetching cart details or processing payment:', error.response ? error.response.data : error.message);
//         setError('An error occurred while processing the payment.');
//       }
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

//         {error && <div className="error text-red-500 mt-4">{error}</div>}
//         {success && <div className="success text-green-500 mt-4">{success}</div>}
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
//   const [loading, setLoading] = useState(false);
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

//   const fetchCartData = async (cartId) => {
//     try {
//       const response = await axios.get(`http://localhost:1234/simcart/cart/${cartId}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching cart data:', error);
//       toast.error('Failed to fetch cart data.');
//       throw error;
//     }
//   };

//   const createCartHistoryRecords = async (cartItems, cartId, custId) => {
//     try {
//       const snapshotPromises = cartItems.map(item => {
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
//     } catch (error) {
//       console.error('Error creating cart history records:', error);
//       toast.error('Failed to create cart history records.');
//       throw error;
//     }
//   };

//   const createOrder = async (orderData) => {
//     try {
//       const response = await axios.post('http://localhost:1234/orders', orderData);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating order:', error);
//       toast.error('Failed to create order.');
//       throw error;
//     }
//   };

//   const clearCart = async (cartId) => {
//     try {
//       const response = await axios.put('http://localhost:1234/simcart', { id: cartId });
//       return response.data;
//     } catch (error) {
//       console.error('Error clearing cart:', error);
//       toast.error('Failed to clear cart items.');
//       throw error;
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       [name]: value
//     }));
//   };

//   const handlePaymentMethodChange = (e) => {
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       paymentMethod: e.target.value
//     }));
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
//       setLoading(true);

//       const cart = await fetchCartData(cartId);

//       if (!cart || !Array.isArray(cart.cartiem)) {
//         throw new Error('Invalid cart data.');
//       }

//       await createCartHistoryRecords(cart.cartiem, cartId, custId);

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

//       const orderResponse = await createOrder(orderData);

//       if (orderResponse === 'Success') {
//         await clearCart(cartId);
//         toast.success('Payment processed and order created successfully!');
//         navigate('/homepage');
//       } else {
//         throw new Error('Failed to create order.');
//       }
//     } catch (error) {
//       console.error('Error during payment process:', error);
//       toast.error('An error occurred while processing the payment.');
//     } finally {
//       setLoading(false);
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
//                 <label key={method} className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value={method}
//                     checked={formData.paymentMethod === method}
//                     onChange={handlePaymentMethodChange}
//                     className="form-radio h-4 w-4 text-red-600"
//                   />
//                   <span className="ml-2 text-sm text-red-700">{method}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Payment Details */}
//           {formData.paymentMethod === 'Credit/Debit Card' && (
//             <div className="bg-red-100 p-4 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold mb-2 text-red-600">Credit/Debit Card Details</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-red-700">Name on Card</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.name && <p className="text-red-500 text-sm mt-1">Name on card is required.</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-red-700">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.email && <p className="text-red-500 text-sm mt-1">A valid email address is required.</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="cardNumber" className="block text-sm font-medium text-red-700">Card Number</label>
//                   <input
//                     type="text"
//                     id="cardNumber"
//                     name="cardNumber"
//                     value={formData.cardNumber}
//                     onChange={handleChange}
//                     className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.cardNumber && <p className="text-red-500 text-sm mt-1">Enter a valid 16-digit card number.</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="expiryDate" className="block text-sm font-medium text-red-700">Expiry Date (MM/YY)</label>
//                   <input
//                     type="text"
//                     id="expiryDate"
//                     name="expiryDate"
//                     value={formData.expiryDate}
//                     onChange={handleChange}
//                     className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.expiryDate && <p className="text-red-500 text-sm mt-1">Enter a valid expiry date.</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="cvv" className="block text-sm font-medium text-red-700">CVV</label>
//                   <input
//                     type="text"
//                     id="cvv"
//                     name="cvv"
//                     value={formData.cvv}
//                     onChange={handleChange}
//                     className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.cvv && <p className="text-red-500 text-sm mt-1">Enter a valid CVV.</p>}
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
//               {errors.upiId && <p className="text-red-500 text-sm mt-1">Enter a valid UPI ID.</p>}
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//             disabled={loading}
//           >
//             {loading ? 'Processing...' : 'Submit Payment'}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default PaymentForm;


