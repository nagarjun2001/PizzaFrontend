// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// function StaffSetPassword() {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     const staffEmail = sessionStorage.getItem('staffEmail');
//     const staffId = sessionStorage.getItem('staffId');
//     if (!staffEmail || !staffId) {
//       setError('Email or ID not found in session storage');
//       return;
//     }

//     console.log('Verifying password for:', staffEmail);
//     console.log('Staff ID:', staffId);
//     console.log('New password:', password);

//     try {
//       // Step 1: Verify current password
//       const verifyResponse = await axios.post('http://localhost:1234/staff/login', {
//         orgemail: staffEmail,
//         password
//       });

//       console.log('Verification response:', verifyResponse.data);
//       if (verifyResponse.data === 'Success') {
//         const values = {
//             id: staffId,
//           password: password
//         }
//         console.log(values);
//         // Step 2: Update the password
//         const updateResponse = await axios.put('http://localhost:1234/staff/updatepassword', values);

//         console.log('Update response:', updateResponse.data);
//         if (updateResponse.data === 'Success') {
//           toast.success('Password updated successfully. Redirecting to home...');
//           setTimeout(() => {
//             navigate('/staffhome');
//           }, 2000);
//         } else {
//           setError('Failed to update password.');
//         }
//       } else {
//         setError('Verification failed. Please check your email and password.');
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Set New Password</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           {success && <p className="text-green-500 text-sm">{success}</p>}
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             Set Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default StaffSetPassword;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function StaffSetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const staffId = sessionStorage.getItem('staffId');
    if (!staffId) {
      setError('Staff ID not found in session storage');
      return;
    }

    console.log('Staff ID:', staffId);
    console.log('New password:', password);

    try {
      // Step 1: Update the password directly
      const updateResponse = await axios.put('http://localhost:1234/staff/updatepassword', {
        id: parseInt(staffId, 10), // Ensure ID is an integer
        password: password
      });

      console.log('Update response:', updateResponse.data);
      if (updateResponse.data === 'Success') {
        toast.success('Password updated successfully. Redirecting to home...');
        setTimeout(() => {
          navigate('/staffhome');
        }, 2000);
      } else {
        setError('Failed to update password.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Set New Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default StaffSetPassword;
