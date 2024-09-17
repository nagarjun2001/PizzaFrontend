// import React, { useState } from 'react';
// import axios from 'axios';
// import AdminNavbar from '../Navbar/AdminNavbar';

// const roles = ['Chef', 'Supplier', 'Delivery Boy'];

// const AddStaff = () => {
//   const [staffName, setStaffName] = useState('');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState(roles[0]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:1234/admin/addstaff', { staffName, username, email, role });
//       alert('Staff added successfully!');
//       setStaffName('');
//       setUsername('');
//       setEmail('');
//     } catch (error) {
//       console.error('Error adding staff', error);
//       alert('Error adding staff');
//     }
//   };

//   return (
//     <>
//     <AdminNavbar />
//     <div className="bg-white text-gray-800 min-h-screen">
//       <header className="bg-red-600 text-white py-4">
//         <div className="container mx-auto">
//           <h1 className="text-3xl font-bold">Manage Staff</h1>
//         </div>
//       </header>

//       <main className="container mx-auto py-8">
//         <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Add New Staff</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium mb-2" htmlFor="staffName">Staff Name</label>
//               <input
//                 type="text"
//                 id="staffName"
//                 value={staffName}
//                 onChange={(e) => setStaffName(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 required />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2" htmlFor="role">Role</label>
//               <select
//                 id="role"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               >
//                 {roles.map((role) => (
//                   <option key={role} value={role}>{role}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-full mt-6 hover:bg-red-700 transition">
//             Add Staff
//           </button>
//         </form>
//       </main>
//     </div></>
//   );
// };

// export default AddStaff;

import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../Navbar/AdminNavbar';
import toast from 'react-hot-toast';

const roles = ['Chef', 'Supplier', 'Delivery Boy'];

const AddStaff = () => {
  const [staffName, setStaffName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(roles[0]);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!staffName || !username || !email || !role) {
      alert('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Invalid email format.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:1234/admin/addstaff', { staffName, username, email, role });
      toast.success('Staff added successfully!');
      setStaffName('');
      setUsername('');
      setEmail('');
      setRole(roles[0]);
    } catch (error) {
      console.error('Error adding staff', error);
      alert('Error adding staff');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="bg-white text-gray-800 min-h-screen">
        <header className="bg-red-600 text-white py-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold">Manage Staff</h1>
          </div>
        </header>

        <main className="container mx-auto py-8">
          <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Staff</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="staffName">Staff Name</label>
                <input
                  type="text"
                  id="staffName"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="role">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
            <button 
              type="submit" 
              className={`bg-red-600 text-white py-2 px-4 rounded-full mt-6 hover:bg-red-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Staff'}
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default AddStaff;
