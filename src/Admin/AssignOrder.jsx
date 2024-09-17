import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../Navbar/AdminNavbar';

const AssignOrder = () => {
  const [staff, setStaff] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');

  useEffect(() => {
    // Fetch staff and orders data from API
    const fetchData = async () => {
      try {
        const staffResponse = await axios.get('/api/staff');
        setStaff(staffResponse.data);
        const ordersResponse = await axios.get('/api/orders');
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/assign', { staffId: selectedStaff, orderId: selectedOrder });
      alert('Order assigned successfully!');
    } catch (error) {
      console.error('Error assigning order', error);
      alert('Error assigning order');
    }
  };

  return (
    <>
    <AdminNavbar />
    <div className="bg-white text-gray-800 min-h-screen">
      <header className="bg-red-600 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Assign Order</h1>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Assign Order to Staff</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="staff">Select Staff</label>
              <select
                id="staff"
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Staff</option>
                {staff.map(staffMember => (
                  <option key={staffMember.id} value={staffMember.id}>{staffMember.staffName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="order">Select Order</label>
              <select
                id="order"
                value={selectedOrder}
                onChange={(e) => setSelectedOrder(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Order</option>
                {orders.map(order => (
                  <option key={order.id} value={order.id}>{order.orderDetails}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-full mt-6 hover:bg-red-700 transition">
            Assign Order
          </button>
        </form>
      </main>
    </div></>
  );
};

export default AssignOrder;
