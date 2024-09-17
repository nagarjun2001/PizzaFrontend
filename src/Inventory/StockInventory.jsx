// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StockInventory = () => {
//   const [inventory, setInventory] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [itemForm, setItemForm] = useState({
//     itemname: '',
//     itemqty: '',
//     lowlevel: '',
//     refillLevel: '',
//     isRefillSelected: 'true', // Default value
//     itemimg: null
//   });

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const fetchInventory = async () => {
//     try {
//       const response = await axios.get('http://localhost:1234/stock/all');
//       setInventory(response.data);
//     } catch (error) {
//       console.error('Error fetching inventory:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setItemForm({
//       ...itemForm,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleFileChange = (e) => {
//     setItemForm({
//       ...itemForm,
//       itemimg: e.target.files[0]
//     });
//   };

//   const handleAddStock = async () => {
//     const formData = new FormData();
//     for (const key in itemForm) {
//       formData.append(key, itemForm[key]);
//     }

//     try {
//       await axios.post('http://localhost:1234/stock', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       fetchInventory();
//       setItemForm({
//         itemname: '',
//         itemqty: '',
//         lowlevel: '',
//         refillLevel: '',
//         isRefillSelected: 'true',
//         itemimg: null
//       });
//     } catch (error) {
//       console.error('Error adding stock:', error);
//     }
//   };

//   const handleUpdateStock = async () => {
//     if (!selectedItem) return;

//     const formData = new FormData();
//     formData.append('itemname', itemForm.itemname);
//     formData.append('itemqty', itemForm.itemqty);
//     formData.append('lowlevel', itemForm.lowlevel);
//     formData.append('refillLevel', itemForm.refillLevel);
//     formData.append('isRefillSelected', itemForm.isRefillSelected);
//     if (itemForm.itemimg) {
//       formData.append('itemimg', itemForm.itemimg);
//     }

//     try {
//       await axios.put(`http://localhost:1234/stock/${selectedItem.id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       fetchInventory();
//       setSelectedItem(null);
//       setItemForm({
//         itemname: '',
//         itemqty: '',
//         lowlevel: '',
//         refillLevel: '',
//         isRefillSelected: 'true',
//         itemimg: null
//       });
//     } catch (error) {
//       console.error('Error updating stock:', error);
//     }
//   };

//   const handleTakeOutStock = async (id, quantity) => {
//     try {
//       await axios.put(`http://localhost:1234/stock/takeout/${id}`, quantity, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       fetchInventory();
//     } catch (error) {
//       console.error('Error taking out stock:', error);
//     }
//   };

//   const handleDeleteStock = async (id) => {
//     try {
//       await axios.delete(`http://localhost:1234/stock/${id}`);
//       fetchInventory();
//     } catch (error) {
//       console.error('Error deleting stock:', error);
//     }
//   };

//   const handleSelectItem = (item) => {
//     setSelectedItem(item);
//     setItemForm({
//       itemname: item.itemname,
//       itemqty: item.itemqty,
//       lowlevel: item.lowlevel,
//       refillLevel: item.refillLevel,
//       isRefillSelected: item.isRefillSelected,
//       itemimg: null
//     });
//   };

//   return (
//     <div>
//       <h1>Stock Inventory</h1>
//       <div>
//         <h2>{selectedItem ? 'Update Stock' : 'Add Stock'}</h2>
//         <input
//           type="text"
//           name="itemname"
//           value={itemForm.itemname}
//           onChange={handleInputChange}
//           placeholder="Item Name"
//         />
//         <input
//           type="number"
//           name="itemqty"
//           value={itemForm.itemqty}
//           onChange={handleInputChange}
//           placeholder="Quantity"
//         />
//         <input
//           type="number"
//           name="lowlevel"
//           value={itemForm.lowlevel}
//           onChange={handleInputChange}
//           placeholder="Low Level"
//         />
//         <input
//           type="number"
//           name="refillLevel"
//           value={itemForm.refillLevel}
//           onChange={handleInputChange}
//           placeholder="Refill Level"
//         />
//         <label>
//           <input
//             type="checkbox"
//             name="isRefillSelected"
//             checked={itemForm.isRefillSelected === 'true'}
//             onChange={(e) => handleInputChange({
//               ...e,
//               target: { ...e.target, value: e.target.checked ? 'true' : 'false' }
//             })}
//           />
//           Refill Selected
//         </label>
//         <input
//           type="file"
//           name="itemimg"
//           onChange={handleFileChange}
//         />
//         {selectedItem ? (
//           <button onClick={handleUpdateStock}>Update Stock</button>
//         ) : (
//           <button onClick={handleAddStock}>Add Stock</button>
//         )}
//       </div>

//       <h2>Inventory List</h2>
//       <ul>
//         {inventory.map(item => (
//           <li key={item.id}>
//             <strong>{item.itemname}</strong> - Qty: {item.itemqty} - Low Level: {item.lowlevel} - Refill Level: {item.refillLevel} - Refill Selected: {item.isRefillSelected}
//             <button onClick={() => handleSelectItem(item)}>Edit</button>
//             <button onClick={() => handleDeleteStock(item.id)}>Delete</button>
//             <button onClick={() => handleTakeOutStock(item.id, prompt('Enter quantity to take out:'))}>Take Out Stock</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StockInventory;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StockInventory = () => {
//   const [inventory, setInventory] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [quantityToUpdate, setQuantityToUpdate] = useState(0);
//   const [takeOutQuantity, setTakeOutQuantity] = useState(0);
//   const [showReorderModal, setShowReorderModal] = useState(false);
//   const [refillStatus, setRefillStatus] = useState('true');

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const fetchInventory = async () => {
//     try {
//       const response = await axios.get('http://localhost:1234/stock/all');
//       setInventory(response.data);
//     } catch (error) {
//       console.error('Error fetching inventory data:', error);
//     }
//   };

//   const handleTakeOutStock = async (id) => {
//     if (takeOutQuantity <= 0) {
//       alert('Quantity to take out must be greater than 0');
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:1234/stock/takeout/${id}`, takeOutQuantity, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data === 'Failure: Quantity cannot be negative') {
//         alert('Insufficient stock quantity');
//       } else {
//         fetchInventory();
//       }
//     } catch (error) {
//       console.error('Error taking out stock:', error);
//     }
//   };

//   const handleUpdateStock = async (id) => {
//     try {
//       const item = inventory.find((i) => i.id === id);
//       if (item) {
//         await axios.put(`http://localhost:1234/stock/${id}`, {
//           itemname: item.itemname,
//           itemqty: quantityToUpdate,
//           lowlevel: item.lowlevel,
//           refillLevel: item.refillLevel,
//           isRefillSelected: refillStatus,
//         }, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         fetchInventory();
//       }
//     } catch (error) {
//       console.error('Error updating stock:', error);
//     }
//   };

//   const handleShowReorderModal = (item) => {
//     setSelectedItem(item);
//     setShowReorderModal(true);
//   };

//   const handleCloseReorderModal = () => {
//     setShowReorderModal(false);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Stock Inventory</h1>
//       <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//         <thead className="bg-gray-100 border-b border-gray-300">
//           <tr>
//             <th className="px-4 py-2 text-left">ID</th>
//             <th className="px-4 py-2 text-left">Item Name</th>
//             <th className="px-4 py-2 text-left">Quantity</th>
//             <th className="px-4 py-2 text-left">Low Level</th>
//             <th className="px-4 py-2 text-left">Refill Level</th>
//             <th className="px-4 py-2 text-left">Refill Selected</th>
//             <th className="px-4 py-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inventory.map((item) => (
//             <tr key={item.id} className="border-b border-gray-200">
//               <td className="px-4 py-2">{item.id}</td>
//               <td className="px-4 py-2">{item.itemname}</td>
//               <td className="px-4 py-2">{item.itemqty}</td>
//               <td className="px-4 py-2">{item.lowlevel}</td>
//               <td className="px-4 py-2">{item.refillLevel}</td>
//               <td className="px-4 py-2">{item.isRefillSelected ? 'Yes' : 'No'}</td>
//               <td className="px-4 py-2">
//                 <button
//                   onClick={() => handleShowReorderModal(item)}
//                   className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   Reorder
//                 </button>
//                 <button
//                   onClick={() => handleUpdateStock(item.id)}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded"
//                 >
//                   Update
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showReorderModal && selectedItem && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
//           <div className="bg-white p-4 rounded-lg shadow-lg w-80">
//             <h2 className="text-xl font-semibold mb-4">Reorder Item</h2>
//             <div className="mb-4">
//               <label className="block text-gray-700">Take Out Quantity</label>
//               <input
//                 type="number"
//                 value={takeOutQuantity}
//                 onChange={(e) => setTakeOutQuantity(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Automatic Refill</label>
//               <select
//                 value={refillStatus}
//                 onChange={(e) => setRefillStatus(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               >
//                 <option value="true">Yes</option>
//                 <option value="false">No</option>
//               </select>
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={() => handleTakeOutStock(selectedItem.id)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//               >
//                 Confirm
//               </button>
//               <button
//                 onClick={handleCloseReorderModal}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StockInventory;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const StockInventory = () => {
//   const [inventory, setInventory] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [takeOutQuantity, setTakeOutQuantity] = useState(0);
//   const [quantityToUpdate, setQuantityToUpdate] = useState('');
//   const [refillStatus, setRefillStatus] = useState('true');
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showTakeoutModal, setShowTakeoutModal] = useState(false);
//   const [showAddProductModal, setShowAddProductModal] = useState(false);
//   const [newProduct, setNewProduct] = useState({
//     itemname: '',
//     itemqty: 0,
//     lowlevel: 0,
//     measurement: '',
//     refillLevel: 0,
//     isRefillSelected: 'true',
//   });
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const fetchInventory = async () => {
//     try {
//       const response = await axios.get('http://localhost:1234/stock/all');
//       setInventory(response.data);
//     } catch (error) {
//       console.error('Error fetching inventory data:', error);
//       toast.error('Error fetching inventory data');
//     }
//   };

//   const handleTakeOutStock = (item) => {
//     setSelectedItem(item);
//     setTakeOutQuantity(0); // Reset quantity
//     setShowTakeoutModal(true); // Open takeout modal
//   };

//   const handleUpdateStock = (item) => {
//     setSelectedItem(item);
//     setQuantityToUpdate(item.itemqty); // Pre-fill with current quantity
//     setRefillStatus(item.isRefillSelected);
//     setShowUpdateModal(true); // Open update modal
//   };

//   const submitTakeOutStock = async () => {
//     if (takeOutQuantity <= 0) {
//       toast.error('Quantity to take out must be greater than 0');
//       return;
//     }

//     // Calculate the new quantity
//     const newQuantity = selectedItem.itemqty - takeOutQuantity;

//     if (newQuantity < 0) {
//       toast.error('Take out quantity cannot be greater than current quantity');
//       return;
//     }

//     // Automatically reorder if necessary
//     const shouldReorder = newQuantity <= selectedItem.lowlevel && selectedItem.isRefillSelected === 'true';
//     const updatedQuantity = shouldReorder ? selectedItem.refillLevel : newQuantity;

//     try {
//       await axios.put(`http://localhost:1234/stock/takeout/${selectedItem.id}`, {
//         takeOutQuantity: takeOutQuantity,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       fetchInventory();
//       handleCloseTakeoutModal();
//       toast.success('Stock updated successfully');
//     } catch (error) {
//       console.error('Error taking out stock:', error);
//       toast.error('Error taking out stock');
//     }
//   };

//   const submitUpdateStock = async () => {
//     if (!selectedItem) return;

//     try {
//       const formData = new FormData();
//       formData.append('itemname', selectedItem.itemname);
//       formData.append('itemqty', quantityToUpdate);
//       formData.append('lowlevel', selectedItem.lowlevel);
//       formData.append('refillLevel', selectedItem.refillLevel);
//       formData.append('isRefillSelected', refillStatus);
//       if (imageFile) {
//         formData.append('itemimg', imageFile);
//       }

//       await axios.put(`http://localhost:1234/stock/${selectedItem.id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       fetchInventory();
//       handleCloseUpdateModal();
//       toast.success('Stock updated successfully');
//     } catch (error) {
//       console.error('Error updating stock:', error);
//       toast.error('Error updating stock');
//     }
//   };

//   const handleAddProduct = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('itemname', newProduct.itemname);
//       formData.append('itemqty', newProduct.itemqty);
//       formData.append('lowlevel', newProduct.lowlevel);
//       formData.append('measurement', newProduct.measurement);
//       formData.append('refillLevel', newProduct.refillLevel);
//       formData.append('isRefillSelected', newProduct.isRefillSelected);
//       if (imageFile) {
//         formData.append('itemimg', imageFile);
//       }

//       await axios.post('http://localhost:1234/stock', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       fetchInventory();
//       handleCloseAddProductModal();
//       setNewProduct({
//         itemname: '',
//         itemqty: 0,
//         lowlevel: 0,
//         measurement: '',
//         refillLevel: 0,
//         isRefillSelected: 'true',
//       });
//       setImageFile(null);
//       toast.success('Product added successfully');
//     } catch (error) {
//       console.error('Error adding new product:', error);
//       toast.error('Error adding new product');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Ensure numeric fields are parsed as numbers
//     if (['itemqty', 'lowlevel', 'refillLevel'].includes(name)) {
//       setNewProduct(prevProduct => ({
//         ...prevProduct,
//         [name]: Number(value)
//       }));
//     } else {
//       setNewProduct(prevProduct => ({
//         ...prevProduct,
//         [name]: value
//       }));
//     }
//   };

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleCloseUpdateModal = () => {
//     setShowUpdateModal(false);
//     setSelectedItem(null); // Clear selected item
//   };

//   const handleCloseTakeoutModal = () => {
//     setShowTakeoutModal(false);
//     setSelectedItem(null); // Clear selected item
//   };

//   const handleCloseAddProductModal = () => {
//     setShowAddProductModal(false);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Stock Inventory</h1>
//       <button
//         onClick={() => setShowAddProductModal(true)}
//         className="bg-green-500 text-white px-4 py-2 rounded mb-4"
//       >
//         Add Product
//       </button>
//       <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//         <thead className="bg-gray-100 border-b border-gray-300">
//           <tr>
//             <th className="px-4 py-2 text-left">ID</th>
//             <th className="px-4 py-2 text-left">Item Name</th>
//             <th className="px-4 py-2 text-left">Quantity</th>
//             <th className="px-4 py-2 text-left">Low Level</th>
//             <th className="px-4 py-2 text-left">Refill Level</th>
//             <th className="px-4 py-2 text-left">Refill Selected</th>
//             <th className="px-4 py-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inventory.map(item => (
//             <tr key={item.id}>
//               <td className="px-4 py-2 border-b border-gray-300">{item.id}</td>
//               <td className="px-4 py-2 border-b border-gray-300">{item.itemname}</td>
//               <td className="px-4 py-2 border-b border-gray-300">{item.itemqty}</td>
//               <td className="px-4 py-2 border-b border-gray-300">{item.lowlevel}</td>
//               <td className="px-4 py-2 border-b border-gray-300">{item.refillLevel}</td>
//               <td className="px-4 py-2 border-b border-gray-300">{item.isRefillSelected}</td>
//               <td className="px-4 py-2 border-b border-gray-300">
//                 <button
//                   onClick={() => handleUpdateStock(item)}
//                   className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => handleTakeOutStock(item)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Take Out
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Update Stock Modal */}
//       {showUpdateModal && selectedItem && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2 className="text-xl font-bold mb-4">Update Stock</h2>
//             <label className="block mb-2">Item Name:</label>
//             <input
//               type="text"
//               name="itemname"
//               value={selectedItem.itemname || ''}
//               disabled
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <label className="block mb-2">Quantity:</label>
//             <input
//               type="number"
//               name="itemqty"
//               value={quantityToUpdate}
//               onChange={(e) => setQuantityToUpdate(Number(e.target.value))}
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <label className="block mb-2">Low Level:</label>
//             <input
//               type="number"
//               name="lowlevel"
//               value={selectedItem.lowlevel || 0}
//               onChange={(e) => setSelectedItem(prevItem => ({
//                 ...prevItem,
//                 lowlevel: Number(e.target.value)
//               }))}
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <label className="block mb-2">Refill Level:</label>
//             <input
//               type="number"
//               name="refillLevel"
//               value={selectedItem.refillLevel || 0}
//               onChange={(e) => setSelectedItem(prevItem => ({
//                 ...prevItem,
//                 refillLevel: Number(e.target.value)
//               }))}
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <label className="block mb-2">Refill Selected:</label>
//             <select
//               name="isRefillSelected"
//               value={selectedItem.isRefillSelected}
//               onChange={(e) => setSelectedItem(prevItem => ({
//                 ...prevItem,
//                 isRefillSelected: e.target.value
//               }))}
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             >
//               <option value="true">Yes</option>
//               <option value="false">No</option>
//             </select>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="block mb-4"
//             />
//             <button
//               onClick={submitUpdateStock}
//               className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//             >
//               Submit
//             </button>
//             <button
//               onClick={handleCloseUpdateModal}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Take Out Stock Modal */}
//       {showTakeoutModal && selectedItem && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2 className="text-xl font-bold mb-4">Take Out Stock</h2>
//             <label className="block mb-2">Item Name:</label>
//             <input
//               type="text"
//               value={selectedItem.itemname || ''}
//               disabled
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <label className="block mb-2">Quantity to Take Out:</label>
//             <input
//               type="number"
//               value={takeOutQuantity}
//               onChange={(e) => setTakeOutQuantity(Number(e.target.value))}
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <button
//               onClick={submitTakeOutStock}
//               className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//             >
//               Submit
//             </button>
//             <button
//               onClick={handleCloseTakeoutModal}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Add Product Modal */}
//       {showAddProductModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2 className="text-xl font-bold mb-4">Add New Product</h2>
//             <label className="block mb-2">Item Name:</label>
//             <input
//               type="text"
//               name="itemname"
//               value={newProduct.itemname}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <label className="block mb-2">Quantity:</label>
//             <input
//               type="number"
//               name="itemqty"
//               value={newProduct.itemqty}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <label className="block mb-2">Low Level:</label>
//             <input
//               type="number"
//               name="lowlevel"
//               value={newProduct.lowlevel}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <label className="block mb-2">Measurement:</label>
//             <input
//               type="text"
//               name="measurement"
//               value={newProduct.measurement}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <label className="block mb-2">Refill Level:</label>
//             <input
//               type="number"
//               name="refillLevel"
//               value={newProduct.refillLevel}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <label className="block mb-2">Refill Selected:</label>
//             <select
//               name="isRefillSelected"
//               value={newProduct.isRefillSelected}
//               onChange={handleInputChange}
//               className="block w-full p-2 border border-gray-300 rounded mb-4"
//             >
//               <option value="true">Yes</option>
//               <option value="false">No</option>
//             </select>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="block mb-4"
//             />
//             <button
//               onClick={handleAddProduct}
//               className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//             >
//               Add Product
//             </button>
//             <button
//               onClick={handleCloseAddProductModal}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StockInventory;

// above code is the best code

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Modal from 'react-modal';
// import AdminNavbar from '../Navbar/AdminNavbar';

// Modal.setAppElement('#root'); // Ensure accessibility

// const StockInventory = () => {
//   const [inventory, setInventory] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [takeOutQuantity, setTakeOutQuantity] = useState(0);
//   const [quantityToUpdate, setQuantityToUpdate] = useState('');
//   const [refillStatus, setRefillStatus] = useState('true');
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showTakeoutModal, setShowTakeoutModal] = useState(false);
//   const [showAddProductModal, setShowAddProductModal] = useState(false);
//   const [newProduct, setNewProduct] = useState({
//     itemname: '',
//     itemqty: 0,
//     lowlevel: 0,
//     measurement: '',
//     refillLevel: 0,
//     isRefillSelected: 'true',
//   });
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const fetchInventory = async () => {
//     try {
//       const response = await axios.get('http://localhost:1234/stock/all');
//       setInventory(response.data);
//     } catch (error) {
//       console.error('Error fetching inventory data:', error);
//       toast.error('Error fetching inventory data');
//     }
//   };

//   const handleTakeOutStock = (item) => {
//     setSelectedItem(item);
//     setTakeOutQuantity(0); // Reset quantity
//     setShowTakeoutModal(true); // Open takeout modal
//   };

//   const handleUpdateStock = (item) => {
//     setSelectedItem(item);
//     setQuantityToUpdate(item.itemqty); // Pre-fill with current quantity
//     setRefillStatus(item.isRefillSelected);
//     setShowUpdateModal(true); // Open update modal
//   };

//   const submitTakeOutStock = async () => {
//     if (takeOutQuantity <= 0) {
//       toast.error('Quantity to take out must be greater than 0');
//       return;
//     }

//     const newQuantity = selectedItem.itemqty - takeOutQuantity;

//     if (newQuantity < 0) {
//       toast.error('Take out quantity cannot be greater than current quantity');
//       return;
//     }

//     const shouldReorder = newQuantity <= selectedItem.lowlevel && selectedItem.isRefillSelected === 'true';
//     const updatedQuantity = shouldReorder ? selectedItem.refillLevel : newQuantity;

//     try {
//       await axios.put(`http://localhost:1234/stock/takeout/${selectedItem.id}`, {
//         takeOutQuantity: takeOutQuantity,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       fetchInventory();
//       handleCloseTakeoutModal();
//       toast.success('Stock updated successfully');
//     } catch (error) {
//       console.error('Error taking out stock:', error);
//       toast.error('Error taking out stock');
//     }
//   };

//   const submitUpdateStock = async () => {
//     if (!selectedItem) return;

//     try {
//       const formData = new FormData();
//       formData.append('itemname', selectedItem.itemname);
//       formData.append('itemqty', quantityToUpdate);
//       formData.append('lowlevel', selectedItem.lowlevel);
//       formData.append('refillLevel', selectedItem.refillLevel);
//       formData.append('isRefillSelected', refillStatus);
//       if (imageFile) {
//         formData.append('itemimg', imageFile);
//       }

//       await axios.put(`http://localhost:1234/stock/${selectedItem.id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       fetchInventory();
//       handleCloseUpdateModal();
//       toast.success('Stock updated successfully');
//     } catch (error) {
//       console.error('Error updating stock:', error);
//       toast.error('Error updating stock');
//     }
//   };

//   const handleAddProduct = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('itemname', newProduct.itemname);
//       formData.append('itemqty', newProduct.itemqty);
//       formData.append('lowlevel', newProduct.lowlevel);
//       formData.append('measurement', newProduct.measurement);
//       formData.append('refillLevel', newProduct.refillLevel);
//       formData.append('isRefillSelected', newProduct.isRefillSelected);
//       if (imageFile) {
//         formData.append('itemimg', imageFile);
//       }

//       await axios.post('http://localhost:1234/stock', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       fetchInventory();
//       handleCloseAddProductModal();
//       setNewProduct({
//         itemname: '',
//         itemqty: 0,
//         lowlevel: 0,
//         measurement: '',
//         refillLevel: 0,
//         isRefillSelected: 'true',
//       });
//       setImageFile(null);
//       toast.success('Product added successfully');
//     } catch (error) {
//       console.error('Error adding new product:', error);
//       toast.error('Error adding new product');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (['itemqty', 'lowlevel', 'refillLevel'].includes(name)) {
//       setNewProduct(prevProduct => ({
//         ...prevProduct,
//         [name]: Number(value)
//       }));
//     } else {
//       setNewProduct(prevProduct => ({
//         ...prevProduct,
//         [name]: value
//       }));
//     }
//   };

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleCloseUpdateModal = () => {
//     setShowUpdateModal(false);
//     setSelectedItem(null); // Clear selected item
//   };

//   const handleCloseTakeoutModal = () => {
//     setShowTakeoutModal(false);
//     setSelectedItem(null); // Clear selected item
//   };

//   const handleCloseAddProductModal = () => {
//     setShowAddProductModal(false);
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div className="p-6 bg-white text-gray-800">
//         <h1 className="text-2xl font-bold mb-6">Stock Inventory</h1>
//         <button
//           onClick={() => setShowAddProductModal(true)}
//           className="bg-white text-red-600 px-4 py-2 rounded mb-6 border border-red-600 hover:bg-red-100 transition"
//         >
//           Add Product
//         </button>
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//           <thead className="bg-gray-100 border-b border-gray-300">
//             <tr>
//               <th className="px-4 py-2 text-left">ID</th>
//               <th className="px-4 py-2 text-left">Item Name</th>
//               <th className="px-4 py-2 text-left">Quantity</th>
//               <th className="px-4 py-2 text-left">Low Level</th>
//               <th className="px-4 py-2 text-left">Refill Level</th>
//               <th className="px-4 py-2 text-left">Refill Selected</th>
//               <th className="px-4 py-2 text-left">Image</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {inventory.map(item => (
//               <tr key={item.id}>
//                 <td className="px-4 py-2 border-b border-gray-300">{item.id}</td>
//                 <td className="px-4 py-2 border-b border-gray-300">{item.itemname}</td>
//                 <td className="px-4 py-2 border-b border-gray-300">{item.itemqty}</td>
//                 <td className="px-4 py-2 border-b border-gray-300">{item.lowlevel}</td>
//                 <td className="px-4 py-2 border-b border-gray-300">{item.refillLevel}</td>
//                 <td className="px-4 py-2 border-b border-gray-300">{item.isRefillSelected}</td>
//                 <td className="px-4 py-2 border-b border-gray-300">
//                   {item.itemimg && <img src={`data:image;base64,${item.itemimg}`} alt={item.itemname} className="w-16 h-16 object-cover" />}
//                 </td>
//                 <td className="px-4 py-2 border-b border-gray-300">
//                   <button
//                     onClick={() => handleUpdateStock(item)}
//                     className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition mr-2"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleTakeOutStock(item)}
//                     className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
//                   >
//                     Take Out
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Update Stock Modal */}
//         <Modal
//           isOpen={showUpdateModal}
//           onRequestClose={handleCloseUpdateModal}
//           className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
//           overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//         >
//           <div className="bg-white p-6 rounded-lg w-full max-w-4xl mx-auto overflow-x-auto">
//             <h2 className="text-xl font-bold mb-4">Update Stock</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-2">Item Name:</label>
//                 <input
//                   type="text"
//                   value={selectedItem?.itemname || ''}
//                   disabled
//                   className="block w-full p-2 border border-gray-300 rounded mb-4" />
//               </div>
//               <div>
//                 <label className="block mb-2">Quantity:</label>
//                 <input
//                   type="number"
//                   value={quantityToUpdate}
//                   onChange={(e) => setQuantityToUpdate(Number(e.target.value))}
//                   className="block w-full p-2 border border-gray-300 rounded mb-4" />
//               </div>
//               <div>
//                 <label className="block mb-2">Low Level:</label>
//                 <input
//                   type="number"
//                   value={selectedItem?.lowlevel || 0}
//                   onChange={(e) => setSelectedItem(prevItem => ({
//                     ...prevItem,
//                     lowlevel: Number(e.target.value)
//                   }))}
//                   className="block w-full p-2 border border-gray-300 rounded mb-4" />
//               </div>
//               <div>
//                 <label className="block mb-2">Refill Level:</label>
//                 <input
//                   type="number"
//                   value={selectedItem?.refillLevel || 0}
//                   onChange={(e) => setSelectedItem(prevItem => ({
//                     ...prevItem,
//                     refillLevel: Number(e.target.value)
//                   }))}
//                   className="block w-full p-2 border border-gray-300 rounded mb-4" />
//               </div>
//               <div>
//                 <label className="block mb-2">Refill Selected:</label>
//                 <select
//                   value={selectedItem?.isRefillSelected}
//                   onChange={(e) => setSelectedItem(prevItem => ({
//                     ...prevItem,
//                     isRefillSelected: e.target.value
//                   }))}
//                   className="block w-full p-2 border border-gray-300 rounded mb-4"
//                 >
//                   <option value="true">Yes</option>
//                   <option value="false">No</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block mb-2">Image:</label>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className="block mb-4" />
//               </div>
//             </div>
//             <div className="flex gap-2 mt-4">
//               <button
//                 onClick={submitUpdateStock}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//               >
//                 Submit
//               </button>
//               <button
//                 onClick={handleCloseUpdateModal}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </Modal>

//         {/* Take Out Stock Modal */}
//         <Modal
//           isOpen={showTakeoutModal}
//           onRequestClose={handleCloseTakeoutModal}
//           className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
//           overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//         >
//           <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto overflow-x-auto">
//             <h2 className="text-xl font-bold mb-4">Take Out Stock</h2>
//             <label className="block mb-2">Item Name:</label>
//             <input
//               type="text"
//               value={selectedItem?.itemname || ''}
//               disabled
//               className="block w-full p-2 border border-gray-300 rounded mb-4" />
//             <label className="block mb-2">Quantity to Take Out:</label>
//             <input
//               type="number"
//               value={takeOutQuantity}
//               onChange={(e) => setTakeOutQuantity(Number(e.target.value))}
//               className="block w-full p-2 border border-gray-300 rounded mb-4" />
//             <div className="flex gap-2 mt-4">
//               <button
//                 onClick={submitTakeOutStock}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//               >
//                 Submit
//               </button>
//               <button
//                 onClick={handleCloseTakeoutModal}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </Modal>

//         {/* Add Product Modal */}
//         <Modal
//           isOpen={showAddProductModal}
//           onRequestClose={handleCloseAddProductModal}
//           className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
//           overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//         >
//           <div className="bg-white p-6 rounded-lg w-full max-w-4xl mx-auto overflow-x-auto">
//             <h2 className="text-xl font-bold mb-4">Add New Product</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-2">Item Name:</label>
//                 <input
//                   type="text"
//                   name="itemname"
//                   value={newProduct.itemname}
//                   onChange={handleInputChange}
//                   className="block w-full p-2 border border-gray-300 rounded mb-4" />
//               </div>
//               <div>
//                 <label className="block mb-2">Quantity:</label>
//                 <input
//                   type="number"
//                   name="itemqty"
//                   value={newProduct.itemqty}
//                   onChange={handleInputChange}
//                   className="block w-full p-2 border border-gray-300 rounded mb-4" />
//               </div>
//               <div>
//                 <label className="block mb-2">Low Level:</label>
//                 <input
//                   type="number"
//                   name="lowlevel"
//                   value={newProduct.lowlevel}
//                   onChange={handleInputChange}
//                   className="block w-full p-2 border border-gray-300 rounded mb-4" />
//               </div>
//               <div>
//                 <label className="block mb-2">Measurement:</label>
//                 <input
//                   type="text"
//                   name="measurement"
//                   value={newProduct.measurement}
//                   onChange={handleInputChange}
//                   className="block w-full p-2 border border-gray-300 rounded mb-4" />
//               </div>
//               <div>
//                 <label className="block mb-2">Refill Level:</label>
//                 <input
//                   type="number"
//                   name="refillLevel"
//                   value={newProduct.refillLevel}
//                   onChange={handleInputChange}
//                   className="block w-full p-2 border border-gray-300 rounded mb-4" />
//               </div>
//               <div>
//                 <label className="block mb-2">Refill Selected:</label>
//                 <select
//                   name="isRefillSelected"
//                   value={newProduct.isRefillSelected}
//                   onChange={handleInputChange}
//                   className="block w-full p-2 border border-gray-300 rounded mb-4"
//                 >
//                   <option value="true">Yes</option>
//                   <option value="false">No</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block mb-2">Image:</label>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className="block mb-4" />
//               </div>
//             </div>
//             <div className="flex gap-2 mt-4">
//               <button
//                 onClick={handleAddProduct}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//               >
//                 Add Product
//               </button>
//               <button
//                 onClick={handleCloseAddProductModal}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default StockInventory;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import AdminNavbar from '../Navbar/AdminNavbar';

Modal.setAppElement('#root'); // Ensure accessibility

const StockInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [takeOutQuantity, setTakeOutQuantity] = useState('');
  const [quantityToUpdate, setQuantityToUpdate] = useState('');
  const [refillStatus, setRefillStatus] = useState('true');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showTakeoutModal, setShowTakeoutModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    itemname: '',
    itemqty: '',
    lowlevel: '',
    measurement: '',
    refillLevel: '',
    isRefillSelected: 'true',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:1234/stock/all');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      toast.error('Error fetching inventory data');
    }
  };

  const handleTakeOutStock = (item) => {
    setSelectedItem(item);
    setTakeOutQuantity(''); // Reset quantity
    setShowTakeoutModal(true); // Open takeout modal
  };

  const handleUpdateStock = (item) => {
    setSelectedItem(item);
    setQuantityToUpdate(item.itemqty);
    setRefillStatus(item.isRefillSelected);
    setShowUpdateModal(true); // Open update modal
  };

  const submitTakeOutStock = async () => {
    if (!takeOutQuantity || takeOutQuantity <= 0) {
      toast.error('Quantity to take out must be greater than 0');
      return;
    }

    const newQuantity = selectedItem.itemqty - takeOutQuantity;

    if (newQuantity < 0) {
      toast.error('Take out quantity cannot be greater than current quantity');
      return;
    }

    const shouldReorder = newQuantity <= selectedItem.lowlevel && selectedItem.isRefillSelected === 'true';
    const updatedQuantity = shouldReorder ? selectedItem.refillLevel : newQuantity;

    try {
      await axios.put(`http://localhost:1234/stock/takeout/${selectedItem.id}`, {
        takeOutQuantity: takeOutQuantity,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchInventory();
      handleCloseTakeoutModal();
      toast.success('Stock updated successfully');
    } catch (error) {
      console.error('Error taking out stock:', error);
      toast.error('Error taking out stock');
    }
  };

  const submitUpdateStock = async () => {
    if (!selectedItem) return;

    if (quantityToUpdate < 0) {
      toast.error('Quantity cannot be negative');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('itemname', selectedItem.itemname);
      formData.append('itemqty', quantityToUpdate);
      formData.append('lowlevel', selectedItem.lowlevel);
      formData.append('refillLevel', selectedItem.refillLevel);
      formData.append('isRefillSelected', refillStatus);
      if (imageFile) {
        formData.append('itemimg', imageFile);
      }

      await axios.put(`http://localhost:1234/stock/${selectedItem.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchInventory();
      handleCloseUpdateModal();
      toast.success('Stock updated successfully');
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Error updating stock');
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.itemname || newProduct.itemqty < 0 || newProduct.lowlevel < 0 || newProduct.refillLevel < 0) {
      toast.error('Please fill in all fields with valid values');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('itemname', newProduct.itemname);
      formData.append('itemqty', newProduct.itemqty);
      formData.append('lowlevel', newProduct.lowlevel);
      formData.append('measurement', newProduct.measurement);
      formData.append('refillLevel', newProduct.refillLevel);
      formData.append('isRefillSelected', newProduct.isRefillSelected);
      if (imageFile) {
        formData.append('itemimg', imageFile);
      }

      await axios.post('http://localhost:1234/stock', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchInventory();
      handleCloseAddProductModal();
      setNewProduct({
        itemname: '',
        itemqty: '',
        lowlevel: '',
        measurement: '',
        refillLevel: '',
        isRefillSelected: 'true',
      });
      setImageFile(null);
      toast.success('Product added successfully');
    } catch (error) {
      console.error('Error adding new product:', error);
      toast.error('Error adding new product');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedItem(null); // Clear selected item
  };

  const handleCloseTakeoutModal = () => {
    setShowTakeoutModal(false);
    setSelectedItem(null); // Clear selected item
  };

  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
  };

  return (
    <>
      <AdminNavbar />
      <div className="bg-red-600 min-h-screen p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Stock Inventory</h1>
        <button
          onClick={() => setShowAddProductModal(true)}
          className="bg-white px-4 py-2 rounded mb-6 border border-red-600 hover:bg-gray-100 transition"
        >
          Add Product +
        </button>
        <div className="overflow-x-auto bg-white p-4 rounded shadow-md">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Item Name</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Low Level</th>
                {/* <th className="px-4 py-2 text-left">Refill Level</th> */}
                {/* <th className="px-4 py-2 text-left">Refill Selected</th> */}
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border-b border-gray-300">{item.id}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{item.itemname}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{item.itemqty}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{item.lowlevel}</td>
                  {/* <td className="px-4 py-2 border-b border-gray-300">{item.refillLevel}</td> */}
                  {/* <td className="px-4 py-2 border-b border-gray-300">{item.isRefillSelected}</td> */}
                  <td className="px-4 py-2 border-b border-gray-300">
                    {item.itemimg && <img src={`data:image;base64,${item.itemimg}`} alt={item.itemname} className="w-16 h-16 object-cover" />}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    <button
                      onClick={() => handleUpdateStock(item)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleTakeOutStock(item)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ml-2"
                    >
                      Take Out
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Stock Modal */}
        <Modal
          isOpen={showUpdateModal}
          onRequestClose={handleCloseUpdateModal}
          className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl mx-auto overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Update Stock</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Item Name:</label>
                <input
                  type="text"
                  value={selectedItem?.itemname || ''}
                  disabled
                  className="block w-full p-2 border border-gray-300 rounded mb-4 bg-gray-100" />
              </div>
              <div>
                <label className="block mb-2">Quantity:</label>
                <input
                  type="number"
                  value={quantityToUpdate}
                  onChange={(e) => setQuantityToUpdate(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded mb-4"
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-2">Low Level:</label>
                <input
                  type="number"
                  value={selectedItem?.lowlevel || ''}
                  onChange={(e) => setSelectedItem(prevItem => ({
                    ...prevItem,
                    lowlevel: e.target.value
                  }))}
                  className="block w-full p-2 border border-gray-300 rounded mb-4"
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-2">Refill Level:</label>
                <input
                  type="number"
                  value={selectedItem?.refillLevel || ''}
                  onChange={(e) => setSelectedItem(prevItem => ({
                    ...prevItem,
                    refillLevel: e.target.value
                  }))}
                  className="block w-full p-2 border border-gray-300 rounded mb-4"
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-2">Refill Selected:</label>
                <select
                  value={selectedItem?.isRefillSelected || 'true'}
                  onChange={(e) => setSelectedItem(prevItem => ({
                    ...prevItem,
                    isRefillSelected: e.target.value
                  }))}
                  className="block w-full p-2 border border-gray-300 rounded mb-4"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Image:</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block mb-4" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={submitUpdateStock}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Submit
              </button>
              <button
                onClick={handleCloseUpdateModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        {/* Take Out Stock Modal */}
        <Modal
          isOpen={showTakeoutModal}
          onRequestClose={handleCloseTakeoutModal}
          className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Take Out Stock</h2>
            <label className="block mb-2">Item Name:</label>
            <input
              type="text"
              value={selectedItem?.itemname || ''}
              disabled
              className="block w-full p-2 border border-gray-300 rounded mb-4 bg-gray-100" />
            <label className="block mb-2">Quantity to Take Out:</label>
            <input
              type="number"
              value={takeOutQuantity}
              onChange={(e) => setTakeOutQuantity(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded mb-4"
              min="0"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={submitTakeOutStock}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Submit
              </button>
              <button
                onClick={handleCloseTakeoutModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        {/* Add Product Modal */}
        <Modal
          isOpen={showAddProductModal}
          onRequestClose={handleCloseAddProductModal}
          className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl mx-auto overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Item Name:</label>
                <input
                  type="text"
                  name="itemname"
                  value={newProduct.itemname}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded mb-4"
                />
              </div>
              <div>
                <label className="block mb-2">Quantity:</label>
                <input
                  type="number"
                  name="itemqty"
                  value={newProduct.itemqty}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded mb-4"
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-2">Low Level:</label>
                <input
                  type="number"
                  name="lowlevel"
                  value={newProduct.lowlevel}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded mb-4"
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-2">Measurement:</label>
                <input
                  type="text"
                  name="measurement"
                  value={newProduct.measurement}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded mb-4"
                />
              </div>
              <div>
                <label className="block mb-2">Refill Level:</label>
                <input
                  type="number"
                  name="refillLevel"
                  value={newProduct.refillLevel}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded mb-4"
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-2">Refill Selected:</label>
                <select
                  name="isRefillSelected"
                  value={newProduct.isRefillSelected}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded mb-4"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Image:</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block mb-4"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddProduct}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Add Product
              </button>
              <button
                onClick={handleCloseAddProductModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default StockInventory;
