// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import StaffNavbar from '../Navbar/StaffNavbar';
// import { FaUserCircle } from 'react-icons/fa'; // Import a staff icon from react-icons

// const StaffProfile = () => {
//   const [formData, setFormData] = useState({
//     id: '',
//     staffName: '',
//     username: '',
//     email: '',
//     orgemail: '',
//     role: '',
//     password: '', // If you need to update the password
//     pwdchanged: false,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false); // Add state for edit mode
  
//   const staffid = sessionStorage.getItem("staffId");

//   useEffect(() => {
//     const fetchStaffData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:1234/staff/${staffid}`); 
//         const staff = response.data;
//         setFormData({
//           id: staff.id,
//           staffName: staff.staffName,
//           username: staff.username,
//           email: staff.email,
//           orgemail: staff.orgemail,
//           role: staff.role,
//           password: '',
//           pwdchanged: staff.pwdchanged,
//         });
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to fetch staff details');
//         setLoading(false);
//       }
//     };

//     fetchStaffData();
//   }, [staffid]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put('http://localhost:1234/staff/updatepassword', {
//         id: staffid,
//         staffName: formData.staffName,
//         username: formData.username,
//         email: formData.email,
//         orgemail: formData.orgemail,
//         role: formData.role,
//         password: formData.password,
//         pwdchanged: formData.pwdchanged,
//       });
//       alert('Profile updated successfully!');
//       setIsEditing(false); // Exit edit mode on successful update
//     } catch (error) {
//       alert('Failed to update profile');
//     }
//   };

//   if (loading) return <div className="text-center mt-8">Loading...</div>;
//   if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

//   return (
//       <><StaffNavbar /><div className="min-h-screen flex flex-col bg-gray-50">
//       <main className="flex-1 container mx-auto p-6">
//         <div className="flex items-center mb-6">
//           <h2 className="text-4xl font-semibold text-gray-800">Staff Profile</h2>
//         </div>
//         <div className="mt-6 bg-white p-8 rounded-lg shadow-lg">
//           {isEditing ? (
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div>
//                   <label htmlFor="staffName" className="block text-sm font-medium text-gray-700">Staff Name</label>
//                   <input
//                     type="text"
//                     id="staffName"
//                     name="staffName"
//                     value={formData.staffName}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     required />
//                 </div>
//                 <div>
//                   <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//                   <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     required />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                   <input disabled
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     required />
//                 </div>
//                 <div>
//                   <label htmlFor="orgemail" className="block text-sm font-medium text-gray-700">Organizational Email</label>
//                   <input disabled
//                     type="email"
//                     id="orgemail"
//                     name="orgemail"
//                     value={formData.orgemail}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     required />
//                 </div>
//                 <div>
//                   <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
//                   <input disabled
//                     type="text"
//                     id="role"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     required />
//                 </div>
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md shadow-sm text-lg font-medium"
//               >
//                 Update Profile
//               </button>
//             </form>
//           ) : (
//             <div>
//               <div className="flex items-center mb-4">
//                 <FaUserCircle className="text-blue-500 text-5xl mr-4" />
//                 <div>
//                   <p className="text-xl font-semibold text-gray-800">Staff Name: {formData.staffName}</p>
//                   <p className="text-xl font-semibold text-gray-800">Username: {formData.username}</p>
//                   <p className="text-xl font-semibold text-gray-800">Email: {formData.email}</p>
//                   <p className="text-xl font-semibold text-gray-800">Organizational Email: {formData.orgemail}</p>
//                   <p className="text-xl font-semibold text-gray-800">Role: {formData.role}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md shadow-sm text-lg font-medium"
//               >
//                 Edit
//               </button>
//             </div>
//           )}
//         </div>
//       </main>
//     </div></>
//   );
// };

// export default StaffProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffNavbar from '../Navbar/StaffNavbar';
import { FaUserCircle } from 'react-icons/fa'; // Import staff icon from react-icons

const StaffProfile = () => {
  const [formData, setFormData] = useState({
    id: '',
    staffName: '',
    username: '',
    email: '',
    orgemail: '',
    role: '',
    password: '', // If you need to update the password
    pwdchanged: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Add state for edit mode
  
  const staffid = sessionStorage.getItem("staffId");

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`http://localhost:1234/staff/${staffid}`);
        const staff = response.data;
        setFormData({
          id: staff.id,
          staffName: staff.staffName,
          username: staff.username,
          email: staff.email,
          orgemail: staff.orgemail,
          role: staff.role,
          password: '',
          pwdchanged: staff.pwdchanged,
        });
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch staff details');
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [staffid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:1234/staff/updatepassword', {
        id: staffid,
        staffName: formData.staffName,
        username: formData.username,
        email: formData.email,
        orgemail: formData.orgemail,
        role: formData.role,
        password: formData.password,
        pwdchanged: formData.pwdchanged,
      });
      alert('Profile updated successfully!');
      setIsEditing(false); // Exit edit mode on successful update
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <>
      <StaffNavbar />
      <div className="bg-white min-h-screen flex flex-col items-center py-8">
        <main className="flex-1 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <FaUserCircle className="text-blue-500 text-6xl mb-4" />
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Staff Profile</h2>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="staffName" className="block text-sm font-medium text-gray-700">Staff Name</label>
                    <input
                      type="text"
                      id="staffName"
                      name="staffName"
                      value={formData.staffName}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required />
                  </div>
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input disabled
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required />
                  </div>
                  <div>
                    <label htmlFor="orgemail" className="block text-sm font-medium text-gray-700">Organizational Email</label>
                    <input disabled
                      type="email"
                      id="orgemail"
                      name="orgemail"
                      value={formData.orgemail}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <input disabled
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required />
                  </div>
                  {/* <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input disabled
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div> */}
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md shadow-sm text-lg font-medium"
                >
                  Update Profile
                </button>
              </form>
            ) : (
              <div>
                <div className="text-start mb-6">
                  <p className="text-xl font-semibold text-gray-800">Staff Name: <span className='text-xl font-normal'>{formData.staffName}</span></p>
                  <p className="text-xl font-semibold text-gray-800">Username: <span className='text-xl font-normal'>{formData.username}</span></p>
                  <p className="text-xl font-semibold text-gray-800">Email: <span className='text-xl font-normal'>{formData.email}</span></p>
                  <p className="text-xl font-semibold text-gray-800">Organizational Email: <span className='text-xl font-normal'>{formData.orgemail}</span></p>
                  <p className="text-xl font-semibold text-gray-800">Role: <span className='text-xl font-normal'>{formData.role}</span></p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md shadow-sm text-lg font-medium"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default StaffProfile;
