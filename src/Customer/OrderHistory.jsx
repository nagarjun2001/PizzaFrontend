// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import NewNav from './NewNav';

// function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [foodData, setFoodData] = useState({});
//   const [ratings, setRatings] = useState({});

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const customerId = sessionStorage.getItem('custid');

//       if (!customerId) {
//         toast.error('Customer ID not found in session storage.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const ordersResponse = await axios.get(`http://localhost:1234/carthistory/customer/${customerId}`);
//         const orders = ordersResponse.data;

//         // Fetch food details and ratings for each order
//         const foodPromises = orders.map(order =>
//           axios.get(`http://localhost:1234/food/${order.foodId}`)
//         );
//         const foodResponses = await Promise.all(foodPromises);
//         const foodDetails = foodResponses.reduce((acc, { data }) => {
//           acc[data.id] = data;
//           return acc;
//         }, {});

//         const ratingsPromises = orders.map(order =>
//           axios.get(`http://localhost:1234/ratings/order/${order.id}`)
//         );
//         const ratingsResponses = await Promise.all(ratingsPromises);
//         const ratingsDetails = ratingsResponses.reduce((acc, { data }) => {
//           if (data.length > 0) {
//             acc[data[0].order.id] = data[0]; // Assuming only one rating per order
//           }
//           return acc;
//         }, {});

//         setOrders(orders);
//         setFoodData(foodDetails);
//         setRatings(ratingsDetails);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         toast.error('Failed to fetch orders.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleRating = async (orderId, stars) => {
//     try {
//       const response = await axios.post('http://localhost:1234/ratings', {
//         order: { id: orderId },
//         stars,
//         review: '', // Optional
//         customer: { id: sessionStorage.getItem('custid') },
//       });
//       if (response.data === 'Success') {
//         toast.success('Rating submitted successfully.');
//         setRatings(prev => ({
//           ...prev,
//           [orderId]: { ...prev[orderId], stars }
//         }));
//       } else {
//         toast.error('Failed to submit rating.');
//       }
//     } catch (error) {
//       console.error('Error submitting rating:', error);
//       toast.error('Failed to submit rating.');
//     }
//   };

//   const renderStars = (orderId, currentRating) => {
//     const stars = Array(5).fill(false).map((_, index) => index < currentRating);
//     return (
//       <div className="flex items-center space-x-1 mt-2">
//         {stars.map((filled, index) => (
//           <svg
//             key={index}
//             className={`w-6 h-6 cursor-pointer transition-transform duration-200 ${filled ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500 hover:scale-110`}
//             fill="currentColor"
//             viewBox="0 0 24 24"
//             onClick={() => handleRating(orderId, index + 1)}
//           >
//             <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
//           </svg>
//         ))}
//       </div>
//     );
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;

//   return (
//     <>
//       <NewNav cartItemCount={orders.length} />
//       <h2 className="text-center font-manrope font-bold text-3xl leading-10 mb-8 text-black">Your Delicious Order History</h2>
//       <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
//         {orders.length === 0 ? (
//           <div className="text-center text-gray-500 text-lg">
//             No orders found. <br /> <a href="/" className="text-blue-500 hover:underline">Place a new order</a>
//           </div>
//         ) : (
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             {orders.map(order => {
//               const food = foodData[order.foodId]; // Get food details for this order
//               const rating = ratings[order.id]?.stars || 0; // Get rating for this order
//               return (
//                 <div key={order.id} className="flex items-start mb-6 border-b border-gray-300 pb-4">
//                   <div className="flex-shrink-0">
//                     {food && (
//                       <img
//                         src={`data:image;base64,${food.fimg}`} // Assuming image is in base64 format
//                         alt={food.fname}
//                         className="w-24 h-24 object-cover rounded-lg shadow-md"
//                       />
//                     )}
//                   </div>
//                   <div className="ml-4 flex-1">
//                     {food && (
//                       <h3 className="text-xl font-semibold text-gray-800 mb-2">{food.fname}</h3>
//                     )}
//                     <p className="text-md text-gray-700 mb-2">Order ID: {order.id}</p>
//                     <p className="text-md text-gray-700 mb-2">Quantity: {order.qty}</p> {/* Added Quantity */}
//                     <p className="text-md text-gray-700 mb-2">Total: ₹ {order.total.toFixed(2)}</p>
//                     {renderStars(order.id, rating)}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>
//     </>
//   );
// }

// export default OrderHistory;
//above is the working code
// working code for both status and order tracking


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import CustomerNavbar from '../Navbar/CustomerNavbar';
// import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa'; // Icons for statuses

// function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [cartItemsHistory, setCartItemsHistory] = useState({});
//   const [foodData, setFoodData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderData = async () => {
//       const customerId = sessionStorage.getItem('custid');

//       if (!customerId) {
//         toast.error('Customer ID not found in session storage.');
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch orders based on customerId
//         const ordersResponse = await axios.get(`http://localhost:1234/orders/cust/${customerId}`);
//         const ordersData = ordersResponse.data;

//         // Fetch cart items history based on customerId
//         const cartItemsResponse = await axios.get(`http://localhost:1234/carthistory/customer/${customerId}`);
//         const cartItems = cartItemsResponse.data;

//         if (ordersData.items.length === 0) {
//           toast.info('No orders found for this customer.');
//         }

//         if (cartItems.length === 0) {
//           toast.info('No cart items found for this customer.');
//         }

//         // Fetch food details for each cart item
//         const foodPromises = cartItems.map(item =>
//           axios.get(`http://localhost:1234/food/${item.foodId}`)
//         );
//         const foodResponses = await Promise.all(foodPromises);
//         const foodDetails = foodResponses.reduce((acc, { data }) => {
//           acc[data.id] = data;
//           return acc;
//         }, {});

//         // Group cart items by orderId
//         const groupedCartItems = cartItems.reduce((acc, item) => {
//           const orderId = item.cartId;
//           if (!acc[orderId]) {
//             acc[orderId] = {
//               items: [],
//               total: 0,
//               deliveryStatus: '', // Initialize with empty value
//               issueStatus: ''     // Initialize with empty value
//             };
//           }
//           acc[orderId].items.push(item);
//           acc[orderId].total += item.total;
//           return acc;
//         }, {});

//         // Set orders and cart items
//         setOrders(ordersData.items);
//         setCartItemsHistory(groupedCartItems);
//         setFoodData(foodDetails);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to fetch data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderData();
//   }, []);

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Delivered':
//         return <FaCheckCircle className="text-green-500" />;
//       case 'Not Delivered':
//         return <FaTimesCircle className="text-red-500" />;
//       case 'Issue':
//         return <FaExclamationTriangle className="text-yellow-500" />;
//       default:
//         return null;
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;

//   return (
//     <>
//       <CustomerNavbar />
//       <h2 className="text-center font-manrope font-bold text-3xl leading-10 mb-8 text-black">Your Delicious Order History</h2>
//       <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
//         {Object.keys(cartItemsHistory).length === 0 ? (
//           <div className="text-center text-gray-500 text-lg">
//             No cart items found. <br /> <a href="/" className="text-blue-500 hover:underline">Place a new order</a>
//           </div>
//         ) : (
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             {Object.keys(cartItemsHistory).map(orderId => {
//               const { items, total, deliveryStatus, issueStatus } = cartItemsHistory[orderId];
//               return (
//                 <div key={orderId} className="mb-8 border-b border-gray-300 pb-4">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">Order ID: {orderId}</h3>
//                   <div className="mb-4">
//                     {items.map(item => {
//                       const food = foodData[item.foodId];
//                       return (
//                         <div key={item.id} className="flex items-start mb-4">
//                           <div className="flex-shrink-0">
//                             {food && (
//                               <img
//                                 src={`data:image;base64,${food.fimg}`}
//                                 alt={food.fname}
//                                 className="w-24 h-24 object-cover rounded-lg shadow-md"
//                               />
//                             )}
//                           </div>
//                           <div className="ml-4 flex-1">
//                             {food && (
//                               <h4 className="text-lg font-semibold text-gray-800 mb-1">{food.fname}</h4>
//                             )}
//                             <p className="text-md text-gray-700 mb-1">Quantity: {item.qty}</p>
//                             <p className="text-md text-gray-700 mb-1">Total: ₹ {item.total.toFixed(2)}</p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <div className="flex items-center text-md text-gray-700 mb-4">
//                     {getStatusIcon(deliveryStatus)}
//                     <span className="ml-2">{deliveryStatus}</span>
//                   </div>
//                   {deliveryStatus === 'Not Delivered' && issueStatus && (
//                     <div className="flex items-center text-md text-gray-700">
//                       {getStatusIcon(issueStatus)}
//                       <span className="ml-2">Issue Status: {issueStatus}</span>
//                     </div>
//                   )}
//                   <div className="text-md font-bold mt-2">Total Price: ₹ {total.toFixed(2)}</div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>
//     </>
//   );
// }

// export default OrderHistory;
// best working for order id


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import CustomerNavbar from '../Navbar/CustomerNavbar';
// import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

// function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [cartItemsHistory, setCartItemsHistory] = useState({});
//   const [foodData, setFoodData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderData = async () => {
//       const customerId = sessionStorage.getItem('custid');

//       if (!customerId) {
//         toast.error('Customer ID not found in session storage.');
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch orders based on customerId
//         const ordersResponse = await axios.get(`http://localhost:1234/orders/cust/${customerId}`);
//         const ordersData = ordersResponse.data;

//         // Fetch cart items history based on customerId
//         const cartItemsResponse = await axios.get(`http://localhost:1234/carthistory/customer/${customerId}`);
//         const cartItems = cartItemsResponse.data || []; // Ensure we have an array

//         // Handle empty orders or cart items
//         if (!ordersData.items || ordersData.items.length === 0) {
//           toast.info('No orders found for this customer.');
//         }
//         if (cartItems.length === 0) {
//           toast.info('No cart items found for this customer.');
//         }

//         // Fetch food details for each cart item
//         const foodPromises = cartItems.map(item =>
//           axios.get(`http://localhost:1234/food/${item.foodId}`)
//         );
//         const foodResponses = await Promise.all(foodPromises);
//         const foodDetails = foodResponses.reduce((acc, { data }) => {
//           acc[data.id] = data;
//           return acc;
//         }, {});

//         // Group cart items by orderId
//         const groupedCartItems = cartItems.reduce((acc, item) => {
//           const orderId = item.cartId;
//           if (!acc[orderId]) {
//             acc[orderId] = {
//               items: [],
//               total: 0,
//               delstatus: '', // Initialize with empty value
//               issueStatus: '' // Initialize with empty value
//             };
//           }
//           acc[orderId].items.push(item);
//           acc[orderId].total += item.total;
//           return acc;
//         }, {});

//         // Add order details (delstatus and issueStatus) to grouped cart items
//         if (ordersData) {
//           groupedCartItems[ordersData.id] = {
//             ...groupedCartItems[ordersData.id],
//             delstatus: ordersData.delstatus || '', // Use empty string if undefined
//             issueStatus: ordersData.issuestatus || '' // Use empty string if undefined
//           };
//         }

//         // Set state with fetched data
//         setOrders([ordersData]); // Set orders state with the full order data
//         setCartItemsHistory(groupedCartItems);
//         setFoodData(foodDetails);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to fetch data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderData();
//   }, []);

//   const getStatusIcon = (status) => {
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return <FaCheckCircle className="text-green-500" />;
//       case 'not delivered':
//         return <FaTimesCircle className="text-red-500" />;
//       case 'issue':
//         return <FaExclamationTriangle className="text-yellow-500" />;
//       default:
//         return null;
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;

//   return (
//     <>
//       <CustomerNavbar />
//       <h2 className="text-center font-manrope font-bold text-3xl leading-10 mb-8 text-black">Your Delicious Order History</h2>
//       <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
//         {Object.keys(cartItemsHistory).length === 0 ? (
//           <div className="text-center text-gray-500 text-lg">
//             No cart items found. <br /> <a href="/" className="text-blue-500 hover:underline">Place a new order</a>
//           </div>
//         ) : (
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             {Object.keys(cartItemsHistory).map(orderId => {
//               const { items, total = 0, delstatus, issueStatus } = cartItemsHistory[orderId];
//               return (
//                 <div key={orderId} className="mb-8 border-b border-gray-300 pb-4">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">Order ID: {orderId}</h3>
//                   <div className="mb-4">
//                     {items && items.map(item => {
//                       const food = foodData[item.foodId];
//                       return (
//                         <div key={item.id} className="flex items-start mb-4">
//                           <div className="flex-shrink-0">
//                             {food && (
//                               <img
//                                 src={`data:image;base64,${food.fimg}`}
//                                 alt={food.fname}
//                                 className="w-24 h-24 object-cover rounded-lg shadow-md"
//                               />
//                             )}
//                           </div>
//                           <div className="ml-4 flex-1">
//                             {food && (
//                               <h4 className="text-lg font-semibold text-gray-800 mb-1">{food.fname}</h4>
//                             )}
//                             <p className="text-md text-gray-700 mb-1">Quantity: {item.qty}</p>
//                             <p className="text-md text-gray-700 mb-1">Total: ₹ {item.total.toFixed(2)}</p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <div className="flex items-center text-md text-gray-700 mb-4">
//                     {getStatusIcon(delstatus)}
//                     <span className="ml-2">{delstatus}</span>
//                   </div>
//                   {delstatus.toLowerCase() === 'not delivered' && issueStatus && (
//                     <div className="flex items-center text-md text-gray-700">
//                       {getStatusIcon(issueStatus)}
//                       <span className="ml-2">Issue Status: {issueStatus}</span>
//                     </div>
//                   )}
//                   <div className="text-md font-bold mt-2">Total Price: ₹ {total.toFixed(2)}</div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>
//     </>
//   );
// }

// export default OrderHistory;
//delivery status working

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import CustomerNavbar from '../Navbar/CustomerNavbar';
// import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

// function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [cartItemsHistory, setCartItemsHistory] = useState({});
//   const [foodData, setFoodData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderData = async () => {
//       const customerId = sessionStorage.getItem('custid');

//       if (!customerId) {
//         toast.error('Customer ID not found in session storage.');
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch orders based on customerId
//         const ordersResponse = await axios.get(`http://localhost:1234/orders/cust/${customerId}`);
//         const ordersData = ordersResponse.data;

//         // Fetch cart items history based on customerId
//         const cartItemsResponse = await axios.get(`http://localhost:1234/carthistory/customer/${customerId}`);
//         const cartItems = cartItemsResponse.data || []; // Ensure we have an array

//         // Handle empty orders or cart items
//         if (!ordersData.items || ordersData.items.length === 0) {
//           toast.info('No orders found for this customer.');
//         }
//         if (cartItems.length === 0) {
//           toast.info('No cart items found for this customer.');
//         }

//         // Fetch food details for each cart item
//         const foodPromises = cartItems.map(item =>
//           axios.get(`http://localhost:1234/food/${item.foodId}`)
//         );
//         const foodResponses = await Promise.all(foodPromises);
//         const foodDetails = foodResponses.reduce((acc, { data }) => {
//           acc[data.id] = data;
//           return acc;
//         }, {});

//         // Group cart items by orderId
//         const groupedCartItems = cartItems.reduce((acc, item) => {
//           const orderId = item.cartId;
//           if (!acc[orderId]) {
//             acc[orderId] = {
//               items: [],
//               total: 0,
//               delstatus: '', // Initialize with empty value
//               issueStatus: '' // Initialize with empty value
//             };
//           }
//           acc[orderId].items.push(item);
//           acc[orderId].total += item.total;
//           return acc;
//         }, {});

//         // Add order details (delstatus and issueStatus) to grouped cart items
//         if (ordersData) {
//           groupedCartItems[ordersData.id] = {
//             ...groupedCartItems[ordersData.id],
//             delstatus: ordersData.delstatus || '', // Use empty string if undefined
//             issueStatus: ordersData.issuestatus || '' // Use empty string if undefined
//           };
//         }

//         // Set state with fetched data
//         setOrders([ordersData]); // Set orders state with the full order data
//         setCartItemsHistory(groupedCartItems);
//         setFoodData(foodDetails);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to fetch data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderData();
//   }, []);

//   const getStatusIcon = (status) => {
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return <FaCheckCircle className="text-green-500" />;
//       case 'not delivered':
//         return <FaTimesCircle className="text-red-500" />;
//       case 'issue':
//         return <FaExclamationTriangle className="text-yellow-500" />;
//       default:
//         return null;
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;

//   return (
//     <>
//       <CustomerNavbar />
//       <h2 className="text-center font-manrope font-bold text-3xl leading-10 mb-8 text-black">Your Delicious Order History</h2>
//       <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
//         {Object.keys(cartItemsHistory).length === 0 ? (
//           <div className="text-center text-gray-500 text-lg">
//             No cart items found. <br /> <a href="/" className="text-blue-500 hover:underline">Place a new order</a>
//           </div>
//         ) : (
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             {Object.keys(cartItemsHistory).map(orderId => {
//               const { items, total = 0, delstatus, issueStatus } = cartItemsHistory[orderId];
//               return (
//                 <div key={orderId} className="mb-8 border-b border-gray-300 pb-4">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">Order ID: {orderId}</h3>
//                   <div className="mb-4">
//                     {items && items.map(item => {
//                       const food = foodData[item.foodId];
//                       return (
//                         <div key={item.id} className="flex items-start mb-4">
//                           <div className="flex-shrink-0">
//                             {food && (
//                               <img
//                                 src={`data:image;base64,${food.fimg}`}
//                                 alt={food.fname}
//                                 className="w-24 h-24 object-cover rounded-lg shadow-md"
//                               />
//                             )}
//                           </div>
//                           <div className="ml-4 flex-1">
//                             {food && (
//                               <h4 className="text-lg font-semibold text-gray-800 mb-1">{food.fname}</h4>
//                             )}
//                             <p className="text-md text-gray-700 mb-1">Quantity: {item.qty}</p>
//                             <p className="text-md text-gray-700 mb-1">Total: ₹ {item.total.toFixed(2)}</p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <div className="flex items-center text-md text-gray-700 mb-4">
//                     {getStatusIcon(delstatus)}
//                     <span className="ml-2">Delivery Status: {delstatus}</span>
//                   </div>
//                   {delstatus.toLowerCase() === 'not delivered' && issueStatus && (
//                     <div className="ml-4 flex items-center text-md text-gray-700">
//                       {getStatusIcon(issueStatus)}
//                       <span className="ml-2">Issue: {issueStatus}</span>
//                     </div>
//                   )}
//                   <div className="text-md font-bold mt-2">Total Price: ₹ {total.toFixed(2)}</div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>
//     </>
//   );
// }

// export default OrderHistory;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import CustomerNavbar from '../Navbar/CustomerNavbar';

// function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [cartItemsHistory, setCartItemsHistory] = useState({});
//   const [foodData, setFoodData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderData = async () => {
//       const customerId = sessionStorage.getItem('custid');

//       if (!customerId) {
//         toast.error('Customer ID not found in session storage.');
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch orders based on customerId
//         const ordersResponse = await axios.get(`http://localhost:1234/orders/cust/${customerId}`);
//         const ordersData = ordersResponse.data;

//         console.log('Orders Data:', ordersData); // Debug: Log the orders data

//         // Fetch cart items history based on customerId
//         const cartItemsResponse = await axios.get(`http://localhost:1234/carthistory/customer/${customerId}`);
//         const cartItems = cartItemsResponse.data || []; // Ensure we have an array

//         console.log('Cart Items:', cartItems); // Debug: Log the cart items

//         // Fetch food details for each cart item
//         const foodPromises = cartItems.map(item =>
//           axios.get(`http://localhost:1234/food/${item.foodId}`)
//         );
//         const foodResponses = await Promise.all(foodPromises);
//         const foodDetails = foodResponses.reduce((acc, { data }) => {
//           acc[data.id] = data;
//           return acc;
//         }, {});

//         console.log('Food Details:', foodDetails); // Debug: Log the food details

//         // Group cart items by orderId
//         const groupedCartItems = cartItems.reduce((acc, item) => {
//           const orderId = item.cartId;
//           if (!acc[orderId]) {
//             acc[orderId] = {
//               items: [],
//               total: 0,
//               delstatus: '', // Initialize with empty value
//               issueStatus: '' // Initialize with empty value
//             };
//           }
//           acc[orderId].items.push(item);
//           acc[orderId].total += item.total;
//           return acc;
//         }, {});

//         // Add order details (delstatus and issueStatus) to grouped cart items
//         if (ordersData) {
//           Object.keys(groupedCartItems).forEach(orderId => {
//             groupedCartItems[orderId] = {
//               ...groupedCartItems[orderId],
//               delstatus: ordersData.delstatus || '', // Use empty string if undefined
//               issueStatus: ordersData.issuestatus || '' // Use empty string if undefined
//             };
//           });
//         }

//         // Set state with fetched data
//         setOrders([ordersData]); // Set orders state with the full order data
//         setCartItemsHistory(groupedCartItems);
//         setFoodData(foodDetails);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to fetch data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderData();
//   }, []);

//   const getStatusIcon = (status) => {
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return <span className="text-green-500">✔️</span>;
//       case 'not delivered':
//         return <span className="text-red-500">❌</span>;
//       case 'pending':
//         return <span className="text-yellow-500">⏳</span>;
//       case 'out for delivery':
//         return <span className="text-blue-500">🚚</span>;
//       default:
//         return null;
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;

//   return (
//     <>
//       <CustomerNavbar />
//       <h2 className="text-center font-manrope font-bold text-3xl leading-10 mb-8 text-black">
//         Your Delicious Order History
//       </h2>
//       <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
//         {Object.keys(cartItemsHistory).length === 0 ? (
//           <div className="text-center text-gray-500 text-lg">
//             No cart items found. <br /> <a href="/" className="text-blue-500 hover:underline">Place a new order</a>
//           </div>
//         ) : (
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             {Object.keys(cartItemsHistory).map(orderId => {
//               const { items, total, delstatus, issueStatus } = cartItemsHistory[orderId];
//               return (
//                 <div key={orderId} className="mb-8 border-b border-gray-300 pb-4">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">Order ID: {orderId}</h3>
//                   <div className="mb-4">
//                     {items && items.map(item => {
//                       const food = foodData[item.foodId];
//                       return (
//                         <div key={item.id} className="flex items-start mb-4">
//                           <div className="flex-shrink-0">
//                             {food && (
//                               <img
//                                 src={`data:image;base64,${food.fimg}`}
//                                 alt={food.fname}
//                                 className="w-24 h-24 object-cover rounded-lg shadow-md"
//                               />
//                             )}
//                           </div>
//                           <div className="ml-4 flex-1">
//                             {food && (
//                               <h4 className="text-lg font-semibold text-gray-800 mb-1">{food.fname}</h4>
//                             )}
//                             <p className="text-md text-gray-700 mb-1">Quantity: {item.qty}</p>
//                             <p className="text-md text-gray-700 mb-1">Total: ₹ {item.total.toFixed(2)}</p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <div className="text-md font-bold mb-2">
//                     Delivery Status: <span className="font-normal">{delstatus || 'N/A'}</span>
//                     {getStatusIcon(delstatus)}
//                   </div>
//                   {delstatus.toLowerCase() === 'not delivered' && issueStatus && (
//                     <div className="flex items-center text-md text-gray-700">
//                       <span className="font-bold">Issue Status:</span> <span className="font-normal">{issueStatus || 'N/A'}</span>
//                     </div>
//                   )}
//                   <div className="text-md font-bold mt-2">
//                     Total Price: ₹ {total.toFixed(2)}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>
//     </>
//   );
// }

// export default OrderHistory;
//Perfect code

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import CustomerNavbar from '../Navbar/CustomerNavbar';
// import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaTruck, FaClock } from 'react-icons/fa';

// function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [cartItemsHistory, setCartItemsHistory] = useState({});
//   const [foodData, setFoodData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderData = async () => {
//       const customerId = sessionStorage.getItem('custid');

//       if (!customerId) {
//         toast.error('Customer ID not found in session storage.');
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch orders based on customerId
//         const ordersResponse = await axios.get(`http://localhost:1234/orders/cust/${customerId}`);
//         const ordersData = ordersResponse.data;

//         // Fetch cart items history based on customerId
//         const cartItemsResponse = await axios.get(`http://localhost:1234/carthistory/customer/${customerId}`);
//         const cartItems = cartItemsResponse.data || []; // Ensure we have an array

//         // Fetch food details for each cart item
//         const foodPromises = cartItems.map(item =>
//           axios.get(`http://localhost:1234/food/${item.foodId}`)
//         );
//         const foodResponses = await Promise.all(foodPromises);
//         const foodDetails = foodResponses.reduce((acc, { data }) => {
//           acc[data.id] = data;
//           return acc;
//         }, {});

//         // Group cart items by orderId
//         const groupedCartItems = cartItems.reduce((acc, item) => {
//           const orderId = item.cartId;
//           if (!acc[orderId]) {
//             acc[orderId] = {
//               items: [],
//               total: 0,
//               delstatus: '',
//               issueStatus: ''
//             };
//           }
//           acc[orderId].items.push(item);
//           acc[orderId].total += item.total;
//           return acc;
//         }, {});

//         if (ordersData) {
//           Object.keys(groupedCartItems).forEach(orderId => {
//             groupedCartItems[orderId] = {
//               ...groupedCartItems[orderId],
//               delstatus: ordersData.delstatus || '',
//               issueStatus: ordersData.issuestatus || ''
//             };
//           });
//         }

//         setOrders([ordersData]);
//         setCartItemsHistory(groupedCartItems);
//         setFoodData(foodDetails);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to fetch data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderData();
//   }, []);

//   const getStatusIcon = (status) => {
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return <FaCheckCircle className="text-green-500" />;
//       case 'not delivered':
//         return <FaTimesCircle className="text-red-500" />;
//       case 'issue':
//         return <FaExclamationTriangle className="text-yellow-500" />;
//       default:
//         return null;
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;

//   return (
//     <>
//       <CustomerNavbar />
//       <h2 className="text-center font-bold text-3xl text-gray-800 my-8">Your Order History</h2>
//       <section className="relative p-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl">
//         {Object.keys(cartItemsHistory).length === 0 ? (
//           <div className="text-center text-gray-500 text-lg">
//             No cart items found. <br /> <a href="/" className="text-red-500 hover:underline">Place a new order</a>
//           </div>
//         ) : (
//           <div>
//             {Object.keys(cartItemsHistory).map(orderId => {
//               const { items, total = 0, delstatus, issueStatus } = cartItemsHistory[orderId];
//               return (
//                 <div key={orderId} className="mb-8 border-b border-gray-300 pb-4">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
//                     <FaTruck className="text-red-500 mr-2" />
//                     Order ID: {orderId}
//                   </h3>
//                   <div className="mb-4">
//                     {items && items.map(item => {
//                       const food = foodData[item.foodId];
//                       return (
//                         <div key={item.id} className="flex items-start mb-4 animate-fadeIn">
//                           <div className="flex-shrink-0">
//                             {food && (
//                               <img
//                                 src={`data:image;base64,${food.fimg}`}
//                                 alt={food.fname}
//                                 className="w-24 h-24 object-cover rounded-lg shadow-md"
//                               />
//                             )}
//                           </div>
//                           <div className="ml-4 flex-1">
//                             {food && (
//                               <h4 className="text-lg font-semibold text-gray-800 mb-1">{food.fname}</h4>
//                             )}
//                             <p className="text-md text-gray-700 mb-1">Quantity: {item.qty}</p>
//                             <p className="text-md text-gray-700 mb-1">Total: ₹ {item.total.toFixed(2)}</p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <div className="flex items-center text-md text-gray-700 mb-4">
//                     {getStatusIcon(delstatus)}
//                     <span className="ml-2 font-bold">{delstatus}</span>
//                     {issueStatus && (
//                       <div className="ml-4 flex items-center text-md text-gray-700">
//                         <FaExclamationTriangle className="text-yellow-500 mr-2" />
//                         <span>{issueStatus}</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="text-md font-bold mt-4">
//                     Total Price: ₹ {total.toFixed(2)}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>
//     </>
//   );
// }

// export default OrderHistory;
//perfect

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomerNavbar from '../Navbar/CustomerNavbar';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaTruck, FaClock } from 'react-icons/fa';
import EmptyOrders from '../components/EmptyOrders';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [cartItemsHistory, setCartItemsHistory] = useState({});
  const [foodData, setFoodData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      const customerId = sessionStorage.getItem('custid');

      if (!customerId) {
        toast.error('Customer ID not found');
        setLoading(false);
        return;
      }

      try {
        const ordersResponse = await axios.get(`http://localhost:1234/orders/cust/${customerId}`);
        const ordersData = ordersResponse.data;

        const cartItemsResponse = await axios.get(`http://localhost:1234/carthistory/customer/${customerId}`);
        const cartItems = cartItemsResponse.data || []; // Ensure we have an array

        const foodPromises = cartItems.map(item =>
          axios.get(`http://localhost:1234/food/${item.foodId}`)
        );
        const foodResponses = await Promise.all(foodPromises);
        const foodDetails = foodResponses.reduce((acc, { data }) => {
          acc[data.id] = data;
          return acc;
        }, {});

        const groupedCartItems = cartItems.reduce((acc, item) => {
          const orderId = item.cartId;
          if (!acc[orderId]) {
            acc[orderId] = {
              items: [],
              total: 0,
              delstatus: '',
              issueStatus: ''
            };
          }
          acc[orderId].items.push(item);
          acc[orderId].total += item.total;
          return acc;
        }, {});

        if (ordersData) {
          Object.keys(groupedCartItems).forEach(orderId => {
            groupedCartItems[orderId] = {
              ...groupedCartItems[orderId],
              delstatus: ordersData.delstatus || '',
              issueStatus: ordersData.issuestatus || ''
            };
          });
        }

        setOrders([ordersData]);
        setCartItemsHistory(groupedCartItems);
        setFoodData(foodDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
        // toast.error('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <FaCheckCircle className="text-green-500 mr-2" />;
      case 'not delivered':
        return <FaTimesCircle className="text-red-500 mr-2" />;
      case 'pending':
        return <FaClock className="text-yellow-500 mr-2" />;
      default:
        return null;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <CustomerNavbar />
      <h2 className="text-center font-bold text-3xl text-gray-800 my-8">Your Orders</h2>
      <section className="relative p-1 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white rounded-2xl">
        {Object.keys(cartItemsHistory).length === 0 ? (
          <div className="text-center text-lg">
            <EmptyOrders />
          </div>
        ) : (
          <div>
            {Object.keys(cartItemsHistory).map(orderId => {
              const { items, total = 0, delstatus, issueStatus } = cartItemsHistory[orderId];
              return (
                <div key={orderId} className="mb-8 p-6 bg-white shadow-md rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaTruck className="text-red-500 mr-2" />
                    Order ID: {orderId}
                  </h3>
                  <div className="mb-4">
                    {items && items.map(item => {
                      const food = foodData[item.foodId];
                      return (
                        <div key={item.id} className="flex items-start mb-4">
                          <div className="flex-shrink-0">
                            {food && (
                              <img
                                src={`data:image;base64,${food.fimg}`}
                                alt={food.fname}
                                className="w-24 h-24 object-cover rounded-lg shadow-md"
                              />
                            )}
                          </div>
                          <div className="ml-4 flex-1">
                            {food && (
                              <h4 className="text-lg font-semibold text-gray-800 mb-1">{food.fname}</h4>
                            )}
                            <p className="text-md text-gray-700 mb-1">Quantity: {item.qty}</p>
                            <p className="text-md text-gray-700 mb-1">Total: ₹ {item.total.toFixed(2)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center text-md text-gray-700 mb-4">
                    {getStatusIcon(delstatus)}
                    <span className='font-bold'>Delivery Status: </span> &nbsp;<span className="font-bold">{delstatus}</span>
                    {issueStatus && (
                      <div className="ml-4 flex items-center text-end text-md text-gray-700">
                        <span className='font-bold'>Issue in Delivery:</span> &nbsp;<FaExclamationTriangle className="text-yellow-500 mr-2" />
                        <span>{issueStatus}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-md font-bold mt-4">
                    Total Price: ₹ {total.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default OrderHistory;

