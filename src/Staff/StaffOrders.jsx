// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Modal from 'react-modal';
// import StaffNavbar from '../Navbar/StaffNavbar';
// Modal.setAppElement('#root');

// const StaffOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [foodItems, setFoodItems] = useState([]);
//   const [customers, setCustomers] = useState({});
//   const [staffId, setStaffId] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const id = sessionStorage.getItem('staffId');
//         if (!id) {
//           console.error('Staff ID not found in session storage.');
//           return;
//         }
//         setStaffId(id);

//         const ordersResponse = await axios.get('http://localhost:1234/orders/accepted');
//         const ordersData = ordersResponse.data || [];

//         const customerIds = new Set();
//         const foodIds = new Set();
//         ordersData.forEach(order => {
//           order.items.forEach(item => {
//             if (item.customerId) customerIds.add(item.customerId);
//             if (item.foodId) foodIds.add(item.foodId);
//           });
//         });

//         const customerPromises = Array.from(customerIds).map(id => axios.get(`http://localhost:1234/customer/${id}`));
//         const foodPromises = Array.from(foodIds).map(id => axios.get(`http://localhost:1234/food/${id}`));

//         const [customerResponses, foodResponses] = await Promise.all([Promise.all(customerPromises), Promise.all(foodPromises)]);

//         const customerMap = customerResponses.reduce((acc, response) => {
//           if (response.data?.id) acc[response.data.id] = response.data;
//           return acc;
//         }, {});

//         const foodMap = foodResponses.reduce((acc, response) => {
//           if (response.data?.id) acc[response.data.id] = response.data;
//           return acc;
//         }, {});

//         setOrders(ordersData);
//         setCustomers(customerMap);
//         setFoodItems(foodMap);
//       } catch (error) {
//         console.error('Error fetching orders or customers:', error);
//         toast.error('Failed to fetch orders or customers.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const acceptOrder = async (orderId) => {
//     try {
//       const response = await axios.post('http://localhost:1234/orders/assignStaff', null, { params: { orderId, staffId } });
//       if (response.data === 'Staff assigned successfully') {
//         toast.success('Order accepted and staff assigned!');
//         setOrders(prevOrders => prevOrders.map(order => order.id === orderId ? { ...order, isAccepted: true } : order));
//       } else {
//         toast.error('Failed to accept order.');
//       }
//     } catch (error) {
//       console.error('Error accepting order:', error);
//       toast.error('An error occurred while accepting the order.');
//     }
//   };

//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       const response = await axios.post('http://localhost:1234/orders/updateStatus', null, { params: { orderId, status } });
//       if (response.data === 'Order status updated successfully') {
//         toast.success(`Order marked as ${status}!`);
//         setOrders(prevOrders =>
//           prevOrders.map(order =>
//             order.id === orderId
//               ? { ...order, delstatus: status }
//               : order
//           )
//         );
//       } else {
//         toast.error('Failed to update order status.');
//       }
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       toast.error('An error occurred while updating the order status.');
//     }
//   };

//   const openModal = (order) => {
//     setSelectedOrder(order);
//   };

//   const closeModal = () => {
//     setSelectedOrder(null);
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <>
//     <StaffNavbar />
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Staff Orders</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {orders.map(order => (
//           <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4 cursor-pointer" onClick={() => openModal(order)}>
//             <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
//             <p><strong>Address:</strong> {order.deladdress}</p>
//             <p><strong>Customer:</strong> {customers[order.items[0]?.customerId]?.fname || 'Loading...'}</p>
//             <p><strong>Mob No:</strong> {customers[order.items[0]?.customerId]?.mobno || 'N/A'}</p>
//             <button onClick={() => acceptOrder(order.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
//               Accept Order
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedOrder && (
//         <Modal
//           isOpen={!!selectedOrder}
//           onRequestClose={closeModal}
//           contentLabel="Order Details"
//           className="fixed inset-0 flex items-center justify-center z-50 p-4"
//           overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
//         >
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
//             <h2 className="text-2xl font-semibold mb-4">Order ID: {selectedOrder.id}</h2>
//             <p><strong>Bill Amount:</strong> ₹ {selectedOrder.total}</p>
//             <p><strong>Address:</strong> {selectedOrder.deladdress}</p>
//             <p><strong>Payment Method:</strong> {selectedOrder.paymentmethod}</p>
//             <p><strong>Customer:</strong> {customers[selectedOrder.items[0]?.customerId]?.fname || 'N/A'} {customers[selectedOrder.items[0]?.customerId]?.lname || ''}</p>
//             <p><strong>Mob No:</strong> {customers[selectedOrder.items[0]?.customerId]?.mobno || 'N/A'}</p>
//             <p><strong>Order Status:</strong> {selectedOrder.delstatus || 'N/A'}</p>

//             <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
//             <div className="flex overflow-x-auto space-x-4 py-2">
//               {selectedOrder.items.map(item => (
//                 <div key={item.id} className="min-w-max bg-white border border-gray-200 rounded-lg shadow-md p-4">
//                   <img src={`data:image;base64,${foodItems[item.foodId]?.fimg}`} alt={foodItems[item.foodId]?.fname} className="w-full h-32 object-cover rounded-md mb-2" />
//                   <p><strong>Food:</strong> {foodItems[item.foodId]?.fname || 'Unknown'}</p>
//                   <p><strong>Price:</strong> ₹{foodItems[item.foodId]?.fprice?.toFixed(2) || '0.00'}</p>
//                   <p><strong>Qty:</strong> {item.qty}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="flex space-x-4 mt-4">
//               <button onClick={() => acceptOrder(selectedOrder.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={selectedOrder.isAccepted}>
//                 Accept
//               </button>
//               <button onClick={() => updateOrderStatus(selectedOrder.id, 'Out for Delivery')} className="bg-yellow-500 text-white px-4 py-2 rounded-md">
//                 Out for Delivery
//               </button>
//               <button onClick={() => updateOrderStatus(selectedOrder.id, 'Delivered')} className="bg-green-500 text-white px-4 py-2 rounded-md" disabled={selectedOrder.delstatus === 'Delivered'}>
//                 Mark as Delivered
//               </button>
//             </div>
//             <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
//               Close
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div></>
//   );
// };

// export default StaffOrders;

//working code for staff accepting order

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Modal from 'react-modal';
// import { motion } from 'framer-motion';
// import StaffNavbar from '../Navbar/StaffNavbar';
// import { FaArrowLeft } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// Modal.setAppElement('#root');

// const StaffOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [customers, setCustomers] = useState({});
//   const [foodItems, setFoodItems] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [staffId, setStaffId] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [deliveryIssues, setDeliveryIssues] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const id = sessionStorage.getItem('staffId');
//         if (!id) {
//           console.error('Staff ID not found in session storage.');
//           return;
//         }
//         setStaffId(id);

//         const ordersResponse = await axios.get(`http://localhost:1234/orders/staff/${id}`);
//         const ordersData = ordersResponse.data || [];

//         const customerIds = new Set();
//         const foodIds = new Set();
//         ordersData.forEach(order => {
//           order.items.forEach(item => {
//             if (item.customerId) customerIds.add(item.customerId);
//             if (item.foodId) foodIds.add(item.foodId);
//           });
//         });

//         const customerPromises = Array.from(customerIds).map(id => axios.get(`http://localhost:1234/customer/${id}`));
//         const foodPromises = Array.from(foodIds).map(id => axios.get(`http://localhost:1234/food/${id}`));

//         const [customerResponses, foodResponses] = await Promise.all([
//           Promise.all(customerPromises),
//           Promise.all(foodPromises)
//         ]);

//         const customerMap = customerResponses.reduce((acc, response) => {
//           if (response.data?.id) acc[response.data.id] = response.data;
//           return acc;
//         }, {});

//         const foodMap = foodResponses.reduce((acc, response) => {
//           if (response.data?.id) acc[response.data.id] = response.data;
//           return acc;
//         }, {});

//         setOrders(ordersData);
//         setCustomers(customerMap);
//         setFoodItems(foodMap);
//       } catch (error) {
//         console.error('Error fetching orders or customers:', error);
//         toast.error('Failed to fetch orders or customers.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const updateOrderStatus = async (orderId, delstatus, issuestatus) => {
//     try {
//       const response = await axios.put(`http://localhost:1234/orders/updateStatus/${orderId}`, {
//         delstatus: delstatus || selectedOrder?.delstatus, // Update delstatus
//         issuestatus: issuestatus || selectedOrder?.issuestatus, // Update issuestatus
//         delissues: issuestatus === 'Not Delivered' ? deliveryIssues : ''
//       });

//       if (response.status === 200) {
//         toast.success('Order status updated successfully!');
//         setOrders(prevOrders =>
//           prevOrders.map(order =>
//             order.id === orderId ? {
//               ...order,
//               delstatus: delstatus || selectedOrder?.delstatus,
//               issuestatus: issuestatus || selectedOrder?.issuestatus,
//               delissues: issuestatus === 'Not Delivered' ? deliveryIssues : ''
//             } : order
//           )
//         );
//         setDeliveryIssues(''); // Clear delivery issues after updating
//       } else {
//         toast.error('Failed to update order status.');
//       }
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       toast.error('An error occurred while updating the order status.');
//     }
//   };

//   const openModal = (order) => {
//     setSelectedOrder(order);
//     setDeliveryIssues(''); // Clear issues when opening modal
//   };

//   const closeModal = () => {
//     setSelectedOrder(null);
//     setDeliveryIssues(''); // Clear delivery issues when closing modal
//   };

//   const handleDeliveryIssuesChange = (e) => {
//     setDeliveryIssues(e.target.value);
//   };

//   const submitIssue = () => {
//     if (deliveryIssues) {
//       updateOrderStatus(selectedOrder.id, 'Not Delivered', 'Customer not attending call');
//     } else {
//       toast.error('Please select an issue.');
//     }
//   };

//   const isButtonDisabled = (status) => {
//     return status?.toLowerCase() === 'delivered';
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <>
//       <StaffNavbar />
//       <div className="container min-h-screen bg-red-600 mx-auto p-4">
//         <div>
//           <button onClick={() => navigate(-1)} className='inline-block text-white hover:text-gray-200'>
//             <FaArrowLeft size={24} />
//           </button>
//           <h1 className="text-2xl text-white font-bold mb-6">Staff Orders</h1>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {orders.map(order => (
//             <motion.div
//               key={order.id}
//               className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 mb-4"
//               onClick={() => openModal(order)}
//             >
//               <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
//               <p><strong>Address:</strong> {order.deladdress}</p>
//               <p><strong>Customer:</strong> {customers[order.items[0]?.customerId]?.fname || 'Loading...'}</p>
//               <p><strong>Mob No:</strong> {customers[order.items[0]?.customerId]?.mobno || 'N/A'}</p>
//               <p><strong>Order Status:</strong> {order.delstatus || 'N/A'}</p>
//               <button className='cursor-pointer transform bg-gray-200 transition-transform duration-300 hover:scale-105 hover:bg-gray-300 rounded-2xl px-2 py-2' onClick={() => openModal(order)}>
//                 View Details
//               </button>
//             </motion.div>
//           ))}
//         </div>

//         {selectedOrder && (
//           <Modal
//             isOpen={!!selectedOrder}
//             onRequestClose={closeModal}
//             contentLabel="Order Details"
//             className="fixed inset-0 flex items-center justify-center z-50 p-4"
//             overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
//           >
//             <div className="bg-white p-6 rounded-lg shadow-lg w-[80vw] max-w-screen-lg max-h-[90vh] overflow-y-auto">
//               <h2 className="text-2xl font-semibold mb-4">Order ID: {selectedOrder.id}</h2>
//               <p><strong>Bill Amount:</strong> ₹ {selectedOrder.total}</p>
//               <p><strong>Address:</strong> {selectedOrder.deladdress}</p>
//               <p><strong>Payment Method:</strong> {selectedOrder.paymentmethod}</p>
//               <p><strong>Customer:</strong> {customers[selectedOrder.items[0]?.customerId]?.fname || 'N/A'} {customers[selectedOrder.items[0]?.customerId]?.lname || ''}</p>
//               <p><strong>Mob No:</strong> {customers[selectedOrder.items[0]?.customerId]?.mobno || 'N/A'}</p>
//               <p><strong>Order Status:</strong> {selectedOrder.delstatus || 'N/A'}</p>

//               <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
//               <div className="flex overflow-x-auto space-x-4 py-2">
//                 {selectedOrder.items.map(item => (
//                   <div key={item.id} className="min-w-max bg-white border border-gray-200 rounded-lg shadow-md p-4">
//                     <img src={`data:image;base64,${foodItems[item.foodId]?.fimg}`} alt={foodItems[item.foodId]?.fname} className="w-full h-32 object-cover rounded-md mb-2" />
//                     <p><strong>Food:</strong> {foodItems[item.foodId]?.fname || 'Unknown'}</p>
//                     <p><strong>Price:</strong> ₹{foodItems[item.foodId]?.fprice?.toFixed(2) || '0.00'}</p>
//                     <p><strong>Qty:</strong> {item.qty}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex space-x-4 mt-4">
//                 {selectedOrder.delstatus === 'Pending' && (
//                   <button
//                     onClick={() => updateOrderStatus(selectedOrder.id, 'Out for Delivery')}
//                     className="bg-yellow-500 text-white px-4 py-2 rounded-md"
//                   >
//                     Out for Delivery
//                   </button>
//                 )}
//                 {selectedOrder.delstatus === 'Out for Delivery' && (
//                   <>
//                     <button
//                       onClick={() => updateOrderStatus(selectedOrder.id, 'Delivered')}
//                       className="bg-green-500 text-white px-4 py-2 rounded-md"
//                       disabled={isButtonDisabled(selectedOrder.delstatus)}
//                     >
//                       Mark as Delivered
//                     </button>
//                     <div className="mt-4">
//                       <label htmlFor="delivery-issues" className="block text-sm font-semibold mb-2">Delivery Issues:</label>
//                       <select
//                         id="delivery-issues"
//                         value={deliveryIssues}
//                         onChange={handleDeliveryIssuesChange}
//                         className="border rounded-md p-2 w-full"
//                       >
//                         <option value="">Select an issue...</option>
//                         <option value="None">None</option>
//                         <option value="Customer not attending call">Customer not attending call</option>
//                         <option value="No response from customer">No response from customer</option>
//                         {/* Add more issues as needed */}
//                       </select>
//                       <button onClick={submitIssue} className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
//                         Submit Issue
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//               <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
//                 Close
//               </button>
//             </div>
//           </Modal>
//         )}
//       </div>
//     </>
//   );
// };

// export default StaffOrders;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import StaffNavbar from '../Navbar/StaffNavbar';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const statusBgColors = {
  Pending: 'bg-gray-300 text-gray-800',
  'Out for Delivery': 'bg-yellow-300 text-yellow-800',
  Delivered: 'bg-green-300 text-green-800',
  'Not Delivered': 'bg-red-300 text-red-800',
};

const StaffOrders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState({});
  const [foodItems, setFoodItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [staffId, setStaffId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveryIssues, setDeliveryIssues] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const id = sessionStorage.getItem('staffId');
        if (!id) {
          console.error('Staff ID not found in session storage.');
          return;
        }
        setStaffId(id);

        const ordersResponse = await axios.get(`http://localhost:1234/orders/staff/${id}`);
        const ordersData = ordersResponse.data || [];

        const customerIds = new Set();
        const foodIds = new Set();
        ordersData.forEach(order => {
          order.items.forEach(item => {
            if (item.customerId) customerIds.add(item.customerId);
            if (item.foodId) foodIds.add(item.foodId);
          });
        });

        const customerPromises = Array.from(customerIds).map(id => axios.get(`http://localhost:1234/customer/${id}`));
        const foodPromises = Array.from(foodIds).map(id => axios.get(`http://localhost:1234/food/${id}`));

        const [customerResponses, foodResponses] = await Promise.all([
          Promise.all(customerPromises),
          Promise.all(foodPromises)
        ]);

        const customerMap = customerResponses.reduce((acc, response) => {
          if (response.data?.id) acc[response.data.id] = response.data;
          return acc;
        }, {});

        const foodMap = foodResponses.reduce((acc, response) => {
          if (response.data?.id) acc[response.data.id] = response.data;
          return acc;
        }, {});

        setOrders(ordersData);
        setCustomers(customerMap);
        setFoodItems(foodMap);
      } catch (error) {
        console.error('Error fetching orders or customers:', error);
        toast.error('Failed to fetch orders or customers.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, delstatus, issuestatus) => {
    try {
      const response = await axios.put(`http://localhost:1234/orders/updateStatus/${orderId}`, {
        delstatus: delstatus || selectedOrder?.delstatus,
        issuestatus: issuestatus || selectedOrder?.issuestatus,
        delissues: issuestatus === 'Not Delivered' ? deliveryIssues : ''
      });

      if (response.status === 200) {
        toast.success('Order status updated successfully!');
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? {
              ...order,
              delstatus: delstatus || selectedOrder?.delstatus,
              issuestatus: issuestatus || selectedOrder?.issuestatus,
              delissues: issuestatus === 'Not Delivered' ? deliveryIssues : ''
            } : order
          )
        );
        setDeliveryIssues(''); // Clear delivery issues after updating
      } else {
        toast.error('Failed to update order status.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('An error occurred while updating the order status.');
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setDeliveryIssues(''); // Clear issues when opening modal
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setDeliveryIssues(''); // Clear delivery issues when closing modal
  };

  const handleDeliveryIssuesChange = (e) => {
    setDeliveryIssues(e.target.value);
  };

  const submitIssue = () => {
    if (deliveryIssues) {
      updateOrderStatus(selectedOrder.id, 'Not Delivered', 'Customer not attending call');
    } else {
      toast.error('Please select an issue.');
    }
  };

  const isButtonDisabled = (status) => {
    return status?.toLowerCase() === 'delivered';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <StaffNavbar />
      <div className="container min-h-screen bg-red-600 mx-auto p-4">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className='inline-block text-white hover:text-gray-200'>
            <FaArrowLeft size={24} />
          </button>
          <h1 className="text-2xl text-white font-bold ml-4">Staff Orders</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => (
            <motion.div
              key={order.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 mb-4 cursor-pointer"
              onClick={() => openModal(order)}
            >
              <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
              <p><strong>Address:</strong> {order.deladdress}</p>
              <p><strong>Customer:</strong> {customers[order.items[0]?.customerId]?.fname || 'Loading...'}</p>
              <p><strong>Mob No:</strong> {customers[order.items[0]?.customerId]?.mobno || 'N/A'}</p>
              <p className={`mr-4 font-semibold mt-2 p-2 rounded-xl inline-block rounded text-white ${statusBgColors[order.delstatus]}`}>
                {order.delstatus || 'N/A'}
              </p>
              <button className='cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-xl p-2 mt-2'>
                View Details
              </button>
            </motion.div>
          ))}
        </div>

        {selectedOrder && (
          <Modal
            isOpen={!!selectedOrder}
            onRequestClose={closeModal}
            contentLabel="Order Details"
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
          >
            <div className="bg-white p-4 rounded-lg shadow-lg w-[90vw] max-w-screen-lg flex relative">
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
                <FaTimes size={24} />
              </button>
              <div className="w-full lg:w-1/2 pr-2 lg:pr-4 overflow-y-auto max-h-[80vh]">
                <h2 className="text-2xl font-semibold mb-4">Order ID: {selectedOrder.id}</h2>
                <p><strong>Bill Amount:</strong> ₹ {selectedOrder.total}</p>
                <p><strong>Address:</strong> {selectedOrder.deladdress}</p>
                <p><strong>Payment Method:</strong> {selectedOrder.paymentmethod}</p>
                <p><strong>Customer:</strong> {customers[selectedOrder.items[0]?.customerId]?.fname || 'N/A'} {customers[selectedOrder.items[0]?.customerId]?.lname || ''}</p>
                <p><strong>Mob No:</strong> {customers[selectedOrder.items[0]?.customerId]?.mobno || 'N/A'}</p>
                <p className={`font-semibold mt-2 p-2 inline-block rounded text-white ${statusBgColors[selectedOrder.delstatus]}`}>
                  Order Status: {selectedOrder.delstatus || 'N/A'}
                </p>

                {/* <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3> */}
              </div>
              <div className="w-full lg:w-1/2 pl-2 lg:pl-4 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="w-full sm:w-1/2 lg:w-1/2 bg-gray-100 border border-gray-200 rounded-md shadow-sm p-2 flex items-center">
                      <img src={`data:image;base64,${foodItems[item.foodId]?.fimg}`} alt={foodItems[item.foodId]?.fname} className="w-24 h-24 object-cover rounded-md mr-2" />
                      <div className="text-sm">
                        <p><strong>Food:</strong> {foodItems[item.foodId]?.fname || 'Unknown'}</p>
                        <p><strong>Price:</strong> ₹{foodItems[item.foodId]?.fprice?.toFixed(2) || '0.00'}</p>
                        <p><strong>Qty:</strong> {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedOrder.delstatus === 'Pending' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'Out for Delivery')}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-2"
                  >
                    Out for Delivery
                  </button>
                )}
                {selectedOrder.delstatus === 'Out for Delivery' && (
                  <>
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'Delivered')}
                      className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
                      disabled={isButtonDisabled(selectedOrder.delstatus)}
                    >
                      Mark as Delivered
                    </button>
                    <div className="mt-4">
                      <label htmlFor="delivery-issues" className="block text-sm font-semibold mb-2">Delivery Issues:</label>
                      <select
                        id="delivery-issues"
                        value={deliveryIssues}
                        onChange={handleDeliveryIssuesChange}
                        className="border rounded-md p-2 w-full"
                      >
                        <option value="">Select an issue...</option>
                        <option value="None">None</option>
                        <option value="Customer not attending call">Customer not attending call</option>
                        <option value="No response from customer">No response from customer</option>
                        {/* Add more issues as needed */}
                      </select>
                      <button onClick={submitIssue} className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
                        Submit Issue
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default StaffOrders;
