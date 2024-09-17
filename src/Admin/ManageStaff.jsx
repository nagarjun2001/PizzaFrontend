// import React, { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import AdminNavbar from '../Navbar/AdminNavbar';

// function ManageStaff() {
//   const [staffName, setStaffName] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState(''); // Default role is empty
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setMessage('');

//     try {
//       const staff = {
//         staffName,
//         username,
//         password,
//         email,
//         role
//       };

//       const response = await axios.post('http://localhost:1234/admin/addstaff', staff);

//       if (response.status === 200) {
//         toast.success('Staff added successfully!');
//         setStaffName('');
//         setUsername('');
//         setPassword('');
//         setEmail('');
//         setRole('');
//       } else {
//         toast.error('Failed to add staff!');
//       }
//     } catch (error) {
//       setMessage('Error: ' + error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <><AdminNavbar /><div className=" mt-5 max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Add New Staff</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="flex flex-col">
//           <label htmlFor="staffName" className="text-lg font-medium text-gray-700">Staff Name</label>
//           <input
//             type="text"
//             id="staffName"
//             value={staffName}
//             onChange={(e) => setStaffName(e.target.value)}
//             required
//             className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="username" className="text-lg font-medium text-gray-700">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="role" className="text-lg font-medium text-gray-700">Role</label>
//           <select
//             id="role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//             className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="" disabled>Select a role</option>
//             <option value="Chef">Chef</option>
//             <option value="Delivery Boy">Delivery Boy</option>
//             <option value="Supplier">Supplier</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
//         >
//           {isSubmitting ? 'Submitting...' : 'Add Staff'}
//         </button>
//       </form>
//       {message && <p className="mt-4 text-center text-green-600">{message}</p>}
//     </div></>
//   );
// }

// export default ManageStaff;


import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminNavbar from '../Navbar/AdminNavbar';

const validateForm = (staffName, username, email, password, role) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  if (!staffName) errors.staffName = "Staff Name is required.";
  if (!username || username.length < 3) errors.username = "Username must be at least 3 characters.";
  if (!email || !emailRegex.test(email)) errors.email = "Please enter a valid email address.";
  if (!password || !passwordRegex.test(password)) errors.password = "Password must be at least 8 characters long, including letters, numbers, and special characters.";
  if (!role) errors.role = "Role is required.";

  return errors;
};

function ManageStaff() {
  const [staffName, setStaffName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); // Default role is empty
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setErrors({});

    const validationErrors = validateForm(staffName, username, email, password, role);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const staff = {
        staffName,
        username,
        password,
        email,
        role
      };

      const response = await axios.post('http://localhost:1234/admin/addstaff', staff);

      if (response.status === 200) {
        toast.success('Staff added successfully!');
        setStaffName('');
        setUsername('');
        setPassword('');
        setEmail('');
        setRole('');
      } else {
        toast.error('Failed to add staff!');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="bg-red-600 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-4xl flex bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {/* Form Column */}
          <div className="w-full md:w-1/2 p-8 pr-4">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Add New Staff</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="staffName" className="text-sm font-medium text-gray-700">Staff Name</label>
                <input
                  type="text"
                  id="staffName"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  required
                  className={`mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.staffName ? 'focus:ring-red-500 border-red-500' : 'focus:ring-red-500'}`}
                />
                {errors.staffName && <p className="text-red-600 text-sm">{errors.staffName}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={`mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.username ? 'focus:ring-red-500 border-red-500' : 'focus:ring-red-500'}`}
                />
                {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500 border-red-500' : 'focus:ring-red-500'}`}
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
              </div>
              {/* <div className="flex flex-col">
                <label htmlFor="password" className="text-lg font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500 border-red-500' : 'focus:ring-red-500'}`}
                />
                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
              </div> */}
              <div className="flex flex-col">
                <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className={`mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.role ? 'focus:ring-red-500 border-red-500' : 'focus:ring-red-500'}`}
                >
                  <option value="" disabled>Select a role</option>
                  <option value="Chef">Chef</option>
                  <option value="Delivery Boy">Delivery Boy</option>
                  <option value="Supplier">Supplier</option>
                </select>
                {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Submitting...' : 'Add Staff'}
              </button>
            </form>
            {message && <p className="mt-4 text-center text-red-600">{message}</p>}
          </div>
          <div className="hidden md:block w-1/2 flex items-center object-within justify-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/010/337/319/original/3d-rendering-delivery-man-character-with-scooter-illustration-object-png.png"
              alt="Staff"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageStaff;
