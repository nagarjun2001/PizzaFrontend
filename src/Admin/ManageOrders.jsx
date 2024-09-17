// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [foodItems, setFoodItems] = useState([]);
//   const [customers, setCustomers] = useState({});
//   const [selectedStaff, setSelectedStaff] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   // Fetch orders
//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get('http://localhost:1234/orders/notaccepted');
//       if (Array.isArray(response.data)) {
//         setOrders(response.data);
//       } else {
//         console.error('Unexpected format of orders data:', response.data);
//         toast.error('Failed to fetch orders.');
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       toast.error('Failed to fetch orders.');
//     }
//   };

//   // Fetch staff
//   const fetchStaff = async () => {
//     try {
//       const response = await axios.get('http://localhost:1234/staff/role/Delivery Boy');
//       if (Array.isArray(response.data)) {
//         setStaff(response.data);
//       } else {
//         console.error('Unexpected format of staff data:', response.data);
//         toast.error('Failed to fetch staff.');
//       }
//     } catch (error) {
//       console.error('Error fetching staff:', error);
//       toast.error('Failed to fetch staff.');
//     }
//   };

//   // Fetch food items
//   const fetchFoodItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:1234/food/all');
//       if (Array.isArray(response.data)) {
//         setFoodItems(response.data);
//       } else {
//         console.error('Unexpected format of food data:', response.data);
//         toast.error('Failed to fetch food items.');
//       }
//     } catch (error) {
//       console.error('Error fetching food items:', error);
//       toast.error('Failed to fetch food items.');
//     }
//   };

//   // Fetch customers
//   const fetchCustomers = async () => {
//     try {
//       const validOrders = orders.filter(order => order.customerId != null);
//       if (validOrders.length === 0) {
//         console.log("No valid customer IDs found.");
//         return;
//       }

//       const uniqueCustomerIds = [...new Set(validOrders.map(order => order.customerId))];
//       const customerPromises = uniqueCustomerIds.map(id => axios.get(`http://localhost:1234/customer/${id}`));
//       const responses = await Promise.all(customerPromises);

//       const customerMap = responses.reduce((acc, response) => {
//         if (response.data && response.data.id) {
//           acc[response.data.id] = response.data;
//         }
//         return acc;
//       }, {});

//       setCustomers(customerMap);
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//       toast.error('Failed to fetch customers.');
//     }
//   };

//   // Fetch all data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchOrders();
//       await fetchStaff();
//       await fetchFoodItems();
//     };
    
//     fetchData().finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     if (orders.length > 0) {
//       fetchCustomers();
//     }
//   }, [orders]);

//   // Handle staff assignment
//   const handleAssignStaff = async (orderId) => {
//     try {
//       const staffId = selectedStaff[orderId];
//       if (!staffId) {
//         toast.error('Please select a staff member.');
//         return;
//       }

//       const response = await axios.post(
//         `http://localhost:1234/orders/assignStaff`,
//         null,
//         { params: { orderId, staffId } }
//       );

//       if (response.data === 'Staff assigned successfully') {
//         toast.success('Staff assigned and order accepted!');
//         setOrders(prevOrders =>
//           prevOrders.map(order =>
//             order.id === orderId
//               ? { ...order, isAccepted: true, staff: { id: staffId } }
//               : order
//           )
//         );
//       } else {
//         toast.error('Failed to assign staff.');
//       }
//     } catch (error) {
//       console.error('Error assigning staff:', error);
//       toast.error('An error occurred while assigning staff.');
//     }
//   };

//   // Handle staff selection
//   const handleStaffChange = (orderId, staffId) => {
//     setSelectedStaff(prev => ({ ...prev, [orderId]: staffId }));
//   };

//   // Group orders by orderId
//   const groupOrdersById = (orders) => {
//     const groupedOrders = {};

//     orders.forEach(order => {
//       if (!groupedOrders[order.id]) {
//         groupedOrders[order.id] = {
//           ...order,
//           items: []
//         };
//       }

//       const customer = customers[order.customerId] || {};
//       const foodDetails = order.items.map(item => {
//         const food = foodItems.find(f => f.id === item.foodId) || {};
//         return {
//           ...item,
//           food
//         };
//       });

//       groupedOrders[order.id].customer = customer;
//       groupedOrders[order.id].items.push(...foodDetails);
//     });

//     return Object.values(groupedOrders);
//   };

//   const groupedOrders = groupOrdersById(orders);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8 text-pizza-red">Pizza Shop - Admin Dashboard</h1>
      
//       <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">Manage Orders</h2>
//         {groupedOrders.length > 0 ? (
//           groupedOrders.map(order => (
//             <div key={order.id} className="border rounded-lg mb-4 p-4 shadow-md">
//               <h3 className="text-lg font-semibold mb-2">Order ID: {order.id}</h3>
//               <p><strong>Customer:</strong> {order.customer.fname || 'N/A'} {order.customer.lname || 'N/A'}</p>
//               <p><strong>Delivery Address:</strong> {order.deladdress || 'N/A'}</p>
//               <p><strong>Date & Time:</strong> {new Date(order.orderdate).toLocaleString()}</p>
//               <h4 className="text-md font-semibold mt-2">Food Items:</h4>
//               <ul className="list-disc pl-5">
//                 {order.items.length > 0 ? (
//                   order.items.map(item => (
//                     <li key={item.food.id || item.foodId} onClick={() => setSelectedOrder(order)}>
//                       {item.food.fname || 'Unknown'} - ₹{item.food.fprice?.toFixed(2) || '0.00'} (Qty: {item.qty})
//                     </li>
//                   ))
//                 ) : (
//                   <li>No food details available</li>
//                 )}
//               </ul>
//               <div className="mt-4">
//                 <select
//                   onChange={(e) => handleStaffChange(order.id, e.target.value)}
//                   value={selectedStaff[order.id] || ''}
//                   className="form-select block w-full mt-1"
//                 >
//                   <option value="">Select Staff</option>
//                   {staff.length > 0 ? (
//                     staff.map(staffMember => (
//                       <option key={staffMember.id} value={staffMember.id}>{staffMember.staffName}</option>
//                     ))
//                   ) : (
//                     <option value="">No staff available</option>
//                   )}
//                 </select>
//                 <button
//                   onClick={() => handleAssignStaff(order.id)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 mt-2"
//                 >
//                   Assign Staff
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No orders found</p>
//         )}
//       </div>

//       {/* Food Image Modal */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedOrder(null)}>
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full" onClick={e => e.stopPropagation()}>
//             <h3 className="text-xl font-semibold mb-4">Order ID: {selectedOrder.id}</h3>
//             <h4 className="text-md font-semibold mb-2">Food Items:</h4>
//             <div className="grid grid-cols-2 gap-4">
//               {selectedOrder.items.map(item => (
//                 <div key={item.food.id || item.foodId} className="p-4 border rounded-md">
//                   <img src={`data:image;base64,${item.food.fimg}`} alt={item.food.fname} className="w-full h-32 object-cover mb-2" />
//                   <p>{item.food.fname || 'Unknown'} - ₹{item.food.fprice?.toFixed(2) || '0.00'} (Qty: {item.qty})</p>
//                 </div>
//               ))}
//             </div>
//             <button onClick={() => setSelectedOrder(null)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageOrders;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Modal from 'react-modal';
// import AdminNavbar from '../Navbar/AdminNavbar';
// Modal.setAppElement('#root');

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState({});
//   const [foodItems, setFoodItems] = useState([]);
//   const [customers, setCustomers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const ordersResponse = await axios.get('http://localhost:1234/orders/notaccepted');
//         setOrders(ordersResponse.data);
        
//         const staffResponse = await axios.get('http://localhost:1234/staff/role/Delivery Boy');
//         setStaff(staffResponse.data);
        
//         const foodItemsResponse = await axios.get('http://localhost:1234/food/all');
//         setFoodItems(foodItemsResponse.data);
        
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to fetch data.');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const validCustomerIds = new Set();
//       orders.forEach(order => {
//         order.items.forEach(item => {
//           if (item.customerId) {
//             validCustomerIds.add(item.customerId);
//           }
//         });
//       });

//       const uniqueCustomerIds = Array.from(validCustomerIds);

//       if (uniqueCustomerIds.length === 0) {
//         return;
//       }

//       const customerPromises = uniqueCustomerIds.map(id => axios.get(`http://localhost:1234/customer/${id}`));
//       const responses = await Promise.all(customerPromises);

//       const customerMap = responses.reduce((acc, response) => {
//         if (response.data && response.data.id) {
//           acc[response.data.id] = response.data;
//         }
//         return acc;
//       }, {});

//       setCustomers(customerMap);
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//       toast.error('Failed to fetch customers.');
//     }
//   };

//   useEffect(() => {
//     if (orders.length > 0) {
//       fetchCustomers();
//     }
//   }, [orders]);

//   const handleAssignStaff = async (orderId) => {
//     try {
//       const staffId = selectedStaff[orderId];
//       if (!staffId) {
//         toast.error('Please select a staff member.');
//         return;
//       }

//       const response = await axios.post(
//         'http://localhost:1234/orders/assignStaff',
//         null,
//         { params: { orderId, staffId } }
//       );

//       if (response.data === 'Staff assigned successfully') {
//         toast.success('Staff assigned and order accepted!');
//         setOrders(prevOrders =>
//           prevOrders.map(order =>
//             order.id === orderId
//               ? { ...order, isAccepted: true, staff: { id: staffId } }
//               : order
//           )
//         );
//       } else {
//         toast.error('Failed to assign staff.');
//       }
//     } catch (error) {
//       console.error('Error assigning staff:', error);
//       toast.error('An error occurred while assigning staff.');
//     }
//   };

//   const handleStaffChange = (orderId, staffId) => {
//     setSelectedStaff(prev => ({ ...prev, [orderId]: staffId }));
//   };

//   const groupOrdersById = (orders) => {
//     const groupedOrders = {};

//     orders.forEach(order => {
//       if (!groupedOrders[order.id]) {
//         groupedOrders[order.id] = {
//           ...order,
//           items: []
//         };
//       }

//       const customer = customers[order.items[0]?.customerId] || {};
//       const foodDetails = order.items.map(item => {
//         const food = foodItems.find(f => f.id === item.foodId) || {};
//         return {
//           ...item,
//           food
//         };
//       });

//       groupedOrders[order.id].customer = customer;
//       groupedOrders[order.id].items.push(...foodDetails);
//     });

//     return Object.values(groupedOrders);
//   };

//   const groupedOrders = groupOrdersById(orders);

//   const openModal = (order) => {
//     setSelectedOrder(order);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedOrder(null);
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <>
//     <AdminNavbar />
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8 text-pizza-red">Pizza Shop - Admin Dashboard</h1>

//       <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">Manage Orders</h2>
//         {groupedOrders.length > 0 ? (
//           groupedOrders.map(order => (
//             <div key={order.id} className="border rounded-lg mb-4 p-4 shadow-md">
//               <h3 className="text-lg font-semibold mb-2">Order ID: {order.id}</h3>
//               <p><strong>Customer Name:</strong> {order.customer.fname || 'N/A'} {order.customer.lname || 'N/A'}</p>
//               <p><strong>Customer Mob no:</strong> {order.customer.mobno || 'N/A'}</p>
//               <p><strong>Delivery Address:</strong> {order.deladdress || 'N/A'}</p>
//               <p><strong>Date & Time:</strong> {new Date(order.orderdate).toLocaleString()}</p>
//               <h4 className="text-md font-semibold mt-2">Food Items:</h4>
//               <ul className="list-disc pl-5">
//                 {order.items.length > 0 ? (
//                   order.items.map(item => (
//                     <li key={item.food.id || item.foodId}>
//                       {item.food.fname || 'Unknown'} - ₹{item.food.fprice?.toFixed(2) || '0.00'} (Qty: {item.qty})
//                     </li>
//                   ))
//                 ) : (
//                   <li>No food details available</li>
//                 )}
//               </ul>
//               <div className="mt-4">
//                 <select
//                   onChange={(e) => handleStaffChange(order.id, e.target.value)}
//                   value={selectedStaff[order.id] || ''}
//                   className="form-select block w-full mt-1"
//                 >
//                   <option value="">Select Staff</option>
//                   {staff.length > 0 ? (
//                     staff.map(staffMember => (
//                       <option key={staffMember.id} value={staffMember.id}>{staffMember.staffName}</option>
//                     ))
//                   ) : (
//                     <option value="">No staff available</option>
//                   )}
//                 </select>
//                 <button
//                   onClick={() => handleAssignStaff(order.id)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 mt-2"
//                 >
//                   Assign Staff
//                 </button>
//                 <button
//                   onClick={() => openModal(order)}
//                   className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 mt-2 ml-2"
//                 >
//                   View Food
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No orders found</p>
//         )}
//       </div>

//       {/* Modal for displaying food images */}
//       {selectedOrder && (
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={closeModal}
//           contentLabel="Order Details"
//           className="fixed inset-0 flex items-center justify-center z-50 p-4 rounded-lg shadow-lg"
//           overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
//         >
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
//             <h2 className="text-xl font-semibold mb-4">Order ID: {selectedOrder.id}</h2>
//             <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 mb-4">
//               Close
//             </button>
//             <h3 className="text-lg font-semibold mb-2">Food Items:</h3>
//             <div className="grid grid-cols-2 gap-4">
//               {selectedOrder.items.map(item => (
//                 <div key={item.food.id || item.foodId} className="border p-4 rounded-lg">
//                   <img src={`data:image;base64,${item.food.fimg}`} alt={item.food.fname} className="w-full h-32 object-cover rounded-md mb-2" />
//                   <p>{item.food.fname || 'Unknown'}</p>
//                   <p className="text-gray-600">₹{item.food.fprice?.toFixed(2) || '0.00'}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div></>
//   );
// };

// export default ManageOrders;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Modal from 'react-modal';
// import AdminNavbar from '../Navbar/AdminNavbar';
// import { FaArrowLeft, FaTimes } from 'react-icons/fa';  // Importing icons for 'Go Back' and 'Close'

// Modal.setAppElement('#root');

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState({});
//   const [foodItems, setFoodItems] = useState([]);
//   const [customers, setCustomers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [staffModalIsOpen, setStaffModalIsOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const ordersResponse = await axios.get('http://localhost:1234/orders/notaccepted');
//         setOrders(ordersResponse.data);
        
//         const staffResponse = await axios.get('http://localhost:1234/staff/role/Delivery Boy');
//         setStaff(staffResponse.data);
        
//         const foodItemsResponse = await axios.get('http://localhost:1234/food/all');
//         setFoodItems(foodItemsResponse.data);
        
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to fetch data.');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const validCustomerIds = new Set();
//       orders.forEach(order => {
//         order.items.forEach(item => {
//           if (item.customerId) {
//             validCustomerIds.add(item.customerId);
//           }
//         });
//       });

//       const uniqueCustomerIds = Array.from(validCustomerIds);

//       if (uniqueCustomerIds.length === 0) {
//         return;
//       }

//       const customerPromises = uniqueCustomerIds.map(id => axios.get(`http://localhost:1234/customer/${id}`));
//       const responses = await Promise.all(customerPromises);

//       const customerMap = responses.reduce((acc, response) => {
//         if (response.data && response.data.id) {
//           acc[response.data.id] = response.data;
//         }
//         return acc;
//       }, {});

//       setCustomers(customerMap);
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//       toast.error('Failed to fetch customers.');
//     }
//   };

//   useEffect(() => {
//     if (orders.length > 0) {
//       fetchCustomers();
//     }
//   }, [orders]);

//   const handleAssignStaff = async () => {
//     try {
//       const staffId = selectedStaff[selectedOrder.id];
//       if (!staffId) {
//         toast.error('Please select a staff member.');
//         return;
//       }

//       const response = await axios.post(
//         'http://localhost:1234/orders/assignStaff',
//         null,
//         { params: { orderId: selectedOrder.id, staffId } }
//       );

//       if (response.data === 'Staff assigned successfully') {
//         toast.success('Staff assigned and order accepted!');
//         setOrders(prevOrders =>
//           prevOrders.map(order =>
//             order.id === selectedOrder.id
//               ? { ...order, isAccepted: true, staff: { id: staffId } }
//               : order
//           )
//         );
//         closeStaffModal();
//       } else {
//         toast.error('Failed to assign staff.');
//       }
//     } catch (error) {
//       console.error('Error assigning staff:', error);
//       toast.error('An error occurred while assigning staff.');
//     }
//   };

//   const handleStaffChange = (staffId) => {
//     setSelectedStaff(prev => ({ ...prev, [selectedOrder.id]: staffId }));
//   };

//   const groupOrdersById = (orders) => {
//     const groupedOrders = {};

//     orders.forEach(order => {
//       if (!groupedOrders[order.id]) {
//         groupedOrders[order.id] = {
//           ...order,
//           items: []
//         };
//       }

//       const customer = customers[order.items[0]?.customerId] || {};
//       const foodDetails = order.items.map(item => {
//         const food = foodItems.find(f => f.id === item.foodId) || {};
//         return {
//           ...item,
//           food
//         };
//       });

//       groupedOrders[order.id].customer = customer;
//       groupedOrders[order.id].items.push(...foodDetails);
//     });

//     return Object.values(groupedOrders);
//   };

//   const groupedOrders = groupOrdersById(orders);

//   const openStaffModal = (order) => {
//     setSelectedOrder(order);
//     setStaffModalIsOpen(true);
//   };

//   const closeStaffModal = () => {
//     setStaffModalIsOpen(false);
//     setSelectedOrder(null);
//   };

//   const openModal = (order) => {
//     setSelectedOrder(order);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedOrder(null);
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <>
//       <AdminNavbar />
//       <div className="bg-red-600 min-h-screen py-8">
//         <div className="max-w-7xl mx-auto px-4">
//           <h1 className="text-3xl font-bold text-center mb-8 text-white">Pizza Shop - Admin Dashboard</h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {groupedOrders.length > 0 ? (
//               groupedOrders.map(order => (
//                 <div key={order.id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
//                   <h3 className="text-lg font-semibold mb-2">Order ID: {order.id}</h3>
//                   <p><strong>Customer Name:</strong> {order.customer.fname || 'N/A'} {order.customer.lname || 'N/A'}</p>
//                   <p><strong>Customer Mob no:</strong> {order.customer.mobno || 'N/A'}</p>
//                   <p><strong>Delivery Address:</strong> {order.deladdress || 'N/A'}</p>
//                   <p><strong>Date & Time:</strong> {new Date(order.orderdate).toLocaleString()}</p>
//                   <h4 className="text-md font-semibold mt-2">Food Items:</h4>
//                   <ul className="list-disc pl-5">
//                     {order.items.length > 0 ? (
//                       order.items.map(item => (
//                         <li key={item.food.id || item.foodId}>
//                           {item.food.fname || 'Unknown'} - ₹{item.food.fprice?.toFixed(2) || '0.00'} (Qty: {item.qty})
//                         </li>
//                       ))
//                     ) : (
//                       <li>No food details available</li>
//                     )}
//                   </ul>
//                   <div className="mt-4 flex gap-2">
//                     <button
//                       onClick={() => openStaffModal(order)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
//                     >
//                       Assign Staff
//                     </button>
//                     <button
//                       onClick={() => openModal(order)}
//                       className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
//                     >
//                       View Food
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center col-span-full">No orders found</p>
//             )}
//           </div>

//           {/* Modal for displaying food images */}
//           {selectedOrder && (
//             <Modal
//               isOpen={modalIsOpen}
//               onRequestClose={closeModal}
//               contentLabel="Order Details"
//               className="fixed inset-0 flex items-center justify-center z-50 p-4 rounded-lg shadow-lg max-w-4xl"
//               overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
//             >
//               <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-auto relative">
//                 <button onClick={closeModal} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
//                   <FaTimes size={24} />
//                 </button>
//                 <h2 className="text-xl font-semibold mb-4">Order ID: {selectedOrder.id}</h2>
//                 <h3 className="text-lg font-semibold mb-2">Food Items:</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   {selectedOrder.items.map(item => (
//                     <div key={item.food.id || item.foodId} className="border p-4 rounded-lg">
//                       <img src={`data:image;base64,${item.food.fimg}`} alt={item.food.fname} className="w-full h-32 object-cover rounded-md mb-2" />
//                       <p>{item.food.fname || 'Unknown'}</p>
//                       <p className="text-gray-600">₹{item.food.fprice?.toFixed(2) || '0.00'}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Modal>
//           )}

//           {/* Modal for assigning staff */}
//           {selectedOrder && (
//             <Modal
//               isOpen={staffModalIsOpen}
//               onRequestClose={closeStaffModal}
//               contentLabel="Assign Staff"
//               className="fixed inset-0 flex items-center justify-center z-50 p-4 rounded-lg shadow-lg max-w-md"
//               overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
//             >
//               <div className="bg-white p-6 rounded-lg shadow-lg w-full max-h-[80vh] overflow-auto relative">
//                 <button onClick={closeStaffModal} className="absolute top-4 left-4 text-red-500 hover:text-red-700">
//                   <FaArrowLeft size={24} />
//                 </button>
//                 <button onClick={closeStaffModal} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
//                   <FaTimes size={24} />
//                 </button>
//                 <h2 className="text-xl font-semibold mb-4">Assign Staff to Order ID: {selectedOrder.id}</h2>
//                 <div className="mb-4">
//                   <label htmlFor="staff" className="block text-gray-700 mb-2">Select Staff:</label>
//                   <select
//                     id="staff"
//                     onChange={(e) => handleStaffChange(e.target.value)}
//                     value={selectedStaff[selectedOrder.id] || ''}
//                     className="form-select block w-full mt-1"
//                   >
//                     <option value="">Select Staff</option>
//                     {staff.length > 0 ? (
//                       staff.map(staffMember => (
//                         <option key={staffMember.id} value={staffMember.id}>{staffMember.staffName}</option>
//                       ))
//                     ) : (
//                       <option value="">No staff available</option>
//                     )}
//                   </select>
//                 </div>
//                 <button
//                   onClick={handleAssignStaff}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
//                 >
//                   Assign Staff
//                 </button>
//               </div>
//             </Modal>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManageOrders;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Modal from 'react-modal';
// import AdminNavbar from '../Navbar/AdminNavbar';
// import { FaArrowLeft, FaTimes } from 'react-icons/fa';  // Importing icons for 'Close'

// Modal.setAppElement('#root');

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState({});
//   const [foodItems, setFoodItems] = useState([]);
//   const [customers, setCustomers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [staffModalIsOpen, setStaffModalIsOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const ordersResponse = await axios.get('http://localhost:1234/orders/notaccepted');
//         setOrders(ordersResponse.data);
        
//         const staffResponse = await axios.get('http://localhost:1234/staff/role/Delivery Boy');
//         setStaff(staffResponse.data);
        
//         const foodItemsResponse = await axios.get('http://localhost:1234/food/all');
//         setFoodItems(foodItemsResponse.data);
        
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to fetch data.');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const validCustomerIds = new Set();
//       orders.forEach(order => {
//         order.items.forEach(item => {
//           if (item.customerId) {
//             validCustomerIds.add(item.customerId);
//           }
//         });
//       });

//       const uniqueCustomerIds = Array.from(validCustomerIds);

//       if (uniqueCustomerIds.length === 0) {
//         return;
//       }

//       const customerPromises = uniqueCustomerIds.map(id => axios.get(`http://localhost:1234/customer/${id}`));
//       const responses = await Promise.all(customerPromises);

//       const customerMap = responses.reduce((acc, response) => {
//         if (response.data && response.data.id) {
//           acc[response.data.id] = response.data;
//         }
//         return acc;
//       }, {});

//       setCustomers(customerMap);
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//       toast.error('Failed to fetch customers.');
//     }
//   };

//   useEffect(() => {
//     if (orders.length > 0) {
//       fetchCustomers();
//     }
//   }, [orders]);

//   const handleAssignStaff = async () => {
//     try {
//       const staffId = selectedStaff[selectedOrder.id];
//       if (!staffId) {
//         toast.error('Please select a staff member.');
//         return;
//       }

//       const response = await axios.post(
//         'http://localhost:1234/orders/assignStaff',
//         null,
//         { params: { orderId: selectedOrder.id, staffId } }
//       );

//       if (response.data === 'Staff assigned successfully') {
//         toast.success('Staff assigned and order accepted!');
//         setOrders(prevOrders =>
//           prevOrders.map(order =>
//             order.id === selectedOrder.id
//               ? { ...order, isAccepted: true, staff: { id: staffId } }
//               : order
//           )
//         );
//         closeStaffModal();
//       } else {
//         toast.error('Failed to assign staff.');
//       }
//     } catch (error) {
//       console.error('Error assigning staff:', error);
//       toast.error('An error occurred while assigning staff.');
//     }
//   };

//   const handleStaffChange = (staffId) => {
//     setSelectedStaff(prev => ({ ...prev, [selectedOrder.id]: staffId }));
//   };

//   const groupOrdersById = (orders) => {
//     const groupedOrders = {};

//     orders.forEach(order => {
//       if (!groupedOrders[order.id]) {
//         groupedOrders[order.id] = {
//           ...order,
//           items: []
//         };
//       }

//       const customer = customers[order.items[0]?.customerId] || {};
//       const foodDetails = order.items.map(item => {
//         const food = foodItems.find(f => f.id === item.foodId) || {};
//         return {
//           ...item,
//           food
//         };
//       });

//       groupedOrders[order.id].customer = customer;
//       groupedOrders[order.id].items.push(...foodDetails);
//     });

//     return Object.values(groupedOrders);
//   };

//   const groupedOrders = groupOrdersById(orders);

//   const openStaffModal = (order) => {
//     setSelectedOrder(order);
//     setStaffModalIsOpen(true);
//   };

//   const closeStaffModal = () => {
//     setStaffModalIsOpen(false);
//     setSelectedOrder(null);
//   };

//   const openModal = (order) => {
//     setSelectedOrder(order);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedOrder(null);
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <>
//       <AdminNavbar />
//       <div className="bg-red-600 min-h-screen py-8">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center mb-8">
//             <FaArrowLeft 
//               size={24} 
//               color="white" 
//               className="cursor-pointer mr-4"
//               onClick={() => window.history.back()}  // Go back functionality
//             />
//             <h1 className="text-3xl font-bold text-center text-white">Pizza Shop - Admin Dashboard</h1>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {groupedOrders.length > 0 ? (
//               groupedOrders.map(order => (
//                 <div key={order.id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
//                   <h3 className="text-lg font-semibold mb-2">Order ID: {order.id}</h3>
//                   <p><strong>Customer Name:</strong> {order.customer.fname || 'N/A'} {order.customer.lname || 'N/A'}</p>
//                   <p><strong>Customer Mob no:</strong> {order.customer.mobno || 'N/A'}</p>
//                   <p><strong>Delivery Address:</strong> {order.deladdress || 'N/A'}</p>
//                   <p><strong>Date & Time:</strong> {new Date(order.orderdate).toLocaleString()}</p>
//                   <h4 className="text-md font-semibold mt-2">Food Items:</h4>
//                   <ul className="list-disc pl-5">
//                     {order.items.length > 0 ? (
//                       order.items.map(item => (
//                         <li key={item.food.id || item.foodId}>
//                           {item.food.fname || 'Unknown'} - ₹{item.food.fprice?.toFixed(2) || '0.00'} (Qty: {item.qty})
//                         </li>
//                       ))
//                     ) : (
//                       <li>No food details available</li>
//                     )}
//                   </ul>
//                   <div className="mt-4 flex gap-2">
//                     <button
//                       onClick={() => openStaffModal(order)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
//                     >
//                       Assign Staff
//                     </button>
//                     <button
//                       onClick={() => openModal(order)}
//                       className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
//                     >
//                       View Food
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center col-span-full">No orders found</p>
//             )}
//           </div>

//           {/* Modal for displaying food images */}
//           {selectedOrder && (
//             <Modal
//               isOpen={modalIsOpen}
//               onRequestClose={closeModal}
//               contentLabel="Order Details"
//               className="fixed inset-0 flex items-center justify-center z-50 p-4 rounded-lg"
//               overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
//             >
//               <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-auto relative">
//                 <button onClick={closeModal} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
//                   <FaTimes size={24} />
//                 </button>
//                 <h2 className="text-xl font-semibold mb-4">Order ID: {selectedOrder.id}</h2>
//                 <h3 className="text-lg font-semibold mb-2">Food Items:</h3>
//                 <div className="flex flex-col space-y-4">
//                   {selectedOrder.items.map(item => (
//                     <div key={item.food.id || item.foodId} className="border p-4 rounded-lg">
//                       <img 
//                         src={`data:image;base64,${item.food.fimg}`} 
//                         alt={item.food.fname} 
//                         className="w-full h-auto object-contain rounded-md mb-2"
//                       />
//                       <p>{item.food.fname || 'Unknown'}</p>
//                       <p className="text-gray-600">₹{item.food.fprice?.toFixed(2) || '0.00'}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Modal>
//           )}

//           {/* Modal for assigning staff */}
//           {selectedOrder && (
//             <Modal
//               isOpen={staffModalIsOpen}
//               onRequestClose={closeStaffModal}
//               contentLabel="Assign Staff"
//               className="fixed inset-0 flex items-center justify-center z-50 p-4 rounded-lg"
//               overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
//             >
//               <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-auto relative">
//                 <button onClick={closeStaffModal} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
//                   <FaTimes size={24} />
//                 </button>
//                 <h2 className="text-xl font-semibold mb-4">Assign Staff to Order ID: {selectedOrder.id}</h2>
//                 <div className="mb-4">
//                   <label htmlFor="staff" className="block text-gray-700 mb-2">Select Staff:</label>
//                   <select
//                     id="staff"
//                     onChange={(e) => handleStaffChange(e.target.value)}
//                     value={selectedStaff[selectedOrder.id] || ''}
//                     className="form-select block w-full mt-1"
//                   >
//                     <option value="">Select Staff</option>
//                     {staff.length > 0 ? (
//                       staff.map(staffMember => (
//                         <option key={staffMember.id} value={staffMember.id}>{staffMember.staffName}</option>
//                       ))
//                     ) : (
//                       <option value="">No staff available</option>
//                     )}
//                   </select>
//                 </div>
//                 <button
//                   onClick={handleAssignStaff}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
//                 >
//                   Assign Staff
//                 </button>
//               </div>
//             </Modal>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManageOrders;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import AdminNavbar from '../Navbar/AdminNavbar';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';  // Importing icons for 'Close'

Modal.setAppElement('#root');

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [foodItems, setFoodItems] = useState([]);
  const [customers, setCustomers] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [staffModalIsOpen, setStaffModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get('http://localhost:1234/orders/notaccepted');
        setOrders(ordersResponse.data);
        
        const staffResponse = await axios.get('http://localhost:1234/staff/role/Delivery Boy');
        setStaff(staffResponse.data);
        
        const foodItemsResponse = await axios.get('http://localhost:1234/food/all');
        setFoodItems(foodItemsResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchCustomers = async () => {
    try {
      const validCustomerIds = new Set();
      orders.forEach(order => {
        order.items.forEach(item => {
          if (item.customerId) {
            validCustomerIds.add(item.customerId);
          }
        });
      });

      const uniqueCustomerIds = Array.from(validCustomerIds);

      if (uniqueCustomerIds.length === 0) {
        return;
      }

      const customerPromises = uniqueCustomerIds.map(id => axios.get(`http://localhost:1234/customer/${id}`));
      const responses = await Promise.all(customerPromises);

      const customerMap = responses.reduce((acc, response) => {
        if (response.data && response.data.id) {
          acc[response.data.id] = response.data;
        }
        return acc;
      }, {});

      setCustomers(customerMap);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to fetch customers.');
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      fetchCustomers();
    }
  }, [orders]);

  const handleAssignStaff = async () => {
    try {
      const staffId = selectedStaff[selectedOrder.id];
      if (!staffId) {
        toast.error('Please select a staff member.');
        return;
      }

      const response = await axios.post(
        'http://localhost:1234/orders/assignStaff',
        null,
        { params: { orderId: selectedOrder.id, staffId } }
      );

      if (response.data === 'Staff assigned successfully') {
        toast.success('Staff assigned and order accepted!');
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === selectedOrder.id
              ? { ...order, isAccepted: true, staff: { id: staffId } }
              : order
          )
        );
        closeStaffModal();
      } else {
        toast.error('Failed to assign staff.');
      }
    } catch (error) {
      console.error('Error assigning staff:', error);
      toast.error('An error occurred while assigning staff.');
    }
  };

  const handleStaffChange = (staffId) => {
    setSelectedStaff(prev => ({ ...prev, [selectedOrder.id]: staffId }));
  };

  const groupOrdersById = (orders) => {
    const groupedOrders = {};

    orders.forEach(order => {
      if (!groupedOrders[order.id]) {
        groupedOrders[order.id] = {
          ...order,
          items: []
        };
      }

      const customer = customers[order.items[0]?.customerId] || {};
      const foodDetails = order.items.map(item => {
        const food = foodItems.find(f => f.id === item.foodId) || {};
        return {
          ...item,
          food
        };
      });

      groupedOrders[order.id].customer = customer;
      groupedOrders[order.id].items.push(...foodDetails);
    });

    return Object.values(groupedOrders);
  };

  const groupedOrders = groupOrdersById(orders);

  const openStaffModal = (order) => {
    setSelectedOrder(order);
    setStaffModalIsOpen(true);
  };

  const closeStaffModal = () => {
    setStaffModalIsOpen(false);
    setSelectedOrder(null);
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOrder(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <AdminNavbar />
      <div className="bg-red-600 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <FaArrowLeft 
              size={24} 
              color="white" 
              className="cursor-pointer mr-4"
              onClick={() => window.history.back()}  // Go back functionality
            />
            <h1 className="text-3xl font-bold flex justify-center text-white">Manage Orders</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {groupedOrders.length > 0 ? (
              groupedOrders.map(order => (
                <div key={order.id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
                  <h3 className="text-lg font-semibold mb-2">Order ID: {order.id}</h3>
                  <p><strong>Customer Name:</strong> {order.customer.fname || 'N/A'} {order.customer.lname || 'N/A'}</p>
                  <p><strong>Customer Mob no:</strong> {order.customer.mobno || 'N/A'}</p>
                  <p><strong>Delivery Address:</strong> {order.deladdress || 'N/A'}</p>
                  <p><strong>Date & Time:</strong> {new Date(order.orderdate).toLocaleString()}</p>
                  <h4 className="text-md font-semibold mt-2">Food Items:</h4>
                  <ul className="list-disc pl-5">
                    {order.items.length > 0 ? (
                      order.items.map(item => (
                        <li key={item.food.id || item.foodId}>
                          {item.food.fname || 'Unknown'} - ₹{item.food.fprice?.toFixed(2) || '0.00'} (Qty: {item.qty})
                        </li>
                      ))
                    ) : (
                      <li>No food details available</li>
                    )}
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => openStaffModal(order)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                    >
                      Assign Staff
                    </button>
                    <button
                      onClick={() => openModal(order)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
                    >
                      View Food
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white col-span-full">No pending orders found</p>
            )}
          </div>

          {/* Modal for displaying food images */}
          {selectedOrder && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Order Details"
              className="fixed inset-0 flex items-center justify-center z-50 p-4 rounded-lg"
              overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-auto relative">
                <button onClick={closeModal} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                  <FaTimes size={24} />
                </button>
                <h2 className="text-xl font-semibold mb-4">Order ID: {selectedOrder.id}</h2>
                <h3 className="text-lg font-semibold mb-2">Food Items:</h3>
                <div className="flex flex-col space-y-4">
                  {selectedOrder.items.map(item => (
                    <div key={item.food.id || item.foodId} className="border p-4 rounded-lg">
                      <img 
                        src={`data:image;base64,${item.food.fimg}`} 
                        alt={item.food.fname} 
                        className="w-full h-64 object-cover   rounded-md mb-2"
                      />
                      <p>{item.food.fname || 'Unknown'}</p>
                      <p className="text-gray-600">₹{item.food.fprice?.toFixed(2) || '0.00'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Modal>
          )}

          {/* Modal for assigning staff */}
          {selectedOrder && (
            <Modal
              isOpen={staffModalIsOpen}
              onRequestClose={closeStaffModal}
              contentLabel="Assign Staff"
              className="fixed inset-0 flex items-center justify-center z-50 p-4 rounded-lg"
              overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-auto relative">
                <button onClick={closeStaffModal} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                  <FaTimes size={24} />
                </button>
                <h2 className="text-xl font-semibold mb-4">Assign Staff to Order ID: {selectedOrder.id}</h2>
                <div className="mb-4">
                  <label htmlFor="staff" className="block text-gray-700 mb-2">Select Staff:</label>
                  <select
                    id="staff"
                    onChange={(e) => handleStaffChange(e.target.value)}
                    value={selectedStaff[selectedOrder.id] || ''}
                    className="form-select block w-full mt-1"
                  >
                    <option value="">Select Staff</option>
                    {staff.length > 0 ? (
                      staff.map(staffMember => (
                        <option key={staffMember.id} value={staffMember.id}>{staffMember.staffName}</option>
                      ))
                    ) : (
                      <option value="">No staff available</option>
                    )}
                  </select>
                </div>
                <button
                  onClick={handleAssignStaff}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                >
                  Assign Staff
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageOrders;
