import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../Navbar/AdminNavbar';

const Stock = () => {
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState('');
  const [lowLevel, setLowLevel] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [refillLevel, setRefillLevel] = useState('');
  const [isRefillSelected, setIsRefillSelected] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/stock', { itemName, itemQty, lowLevel, measurement, refillLevel, isRefillSelected });
      alert('Stock added successfully!');
      setItemName('');
      setItemQty('');
      setLowLevel('');
      setMeasurement('');
      setRefillLevel('');
      setIsRefillSelected(false);
    } catch (error) {
      console.error('Error adding stock', error);
      alert('Error adding stock');
    }
  };

  return (
    <><AdminNavbar /><div className="bg-white text-gray-800 min-h-screen">
      <header className="bg-red-600 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Manage Stock</h1>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Add New Stock Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="itemName">Item Name</label>
              <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="itemQty">Item Quantity</label>
              <input
                type="number"
                id="itemQty"
                value={itemQty}
                onChange={(e) => setItemQty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="lowLevel">Low Level</label>
              <input
                type="number"
                id="lowLevel"
                value={lowLevel}
                onChange={(e) => setLowLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="measurement">Measurement</label>
              <input
                type="text"
                id="measurement"
                value={measurement}
                onChange={(e) => setMeasurement(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="refillLevel">Refill Level</label>
              <input
                type="number"
                id="refillLevel"
                value={refillLevel}
                onChange={(e) => setRefillLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required />
            </div>
            <div className="col-span-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isRefillSelected}
                  onChange={(e) => setIsRefillSelected(e.target.checked)}
                  className="form-checkbox" />
                <span className="ml-2 text-sm font-medium">Enable Automatic Reordering</span>
              </label>
            </div>
          </div>
          <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-full mt-6 hover:bg-red-700 transition">
            Add Stock Item
          </button>
        </form>
      </main>
    </div></>
  );
};

export default Stock;

