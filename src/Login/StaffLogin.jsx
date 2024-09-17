// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import StaffLogNav from '../Navbar/StaffLogNav';

// function StaffLogin() {
//   const [orgemail, setOrgemail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const history = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:1234/staff/login', { orgemail, password });
      
//       if (response.data === 'Password Change required!') {
//         const staff = await axios.get(`http://localhost:1234/staff/orgemail/${orgemail}`);
//         sessionStorage.setItem('staffEmail', orgemail);
//         sessionStorage.setItem('staffId', staff.data.id);
//         history('/staffsetpwd');
//       }
//       else if (response.data === 'Success') {
//         const staff = await axios.get(`http://localhost:1234/staff/orgemail/${orgemail}`);
//         sessionStorage.setItem('staffEmail', orgemail);
//         sessionStorage.setItem('staffId', staff.data.id);
//         history('/staffhome');
//         toast.success("Logged in successfully");
//       }
//       else {
//         setError('Invalid credentials or ' + response.data);
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <><StaffLogNav /><div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Staff Login</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="orgemail" className="block text-sm font-medium text-gray-700">Organization Email</label>
//             <input
//               type="email"
//               id="orgemail"
//               value={orgemail}
//               onChange={(e) => setOrgemail(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div></>
//   );
// }

// export default StaffLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import StaffLogNav from '../Navbar/StaffLogNav';

function StaffLogin() {
  const [orgemail, setOrgemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:1234/staff/login', { orgemail, password });
      
      if (response.data === 'Password Change required!') {
        const staff = await axios.get(`http://localhost:1234/staff/orgemail/${orgemail}`);
        sessionStorage.setItem('staffEmail', orgemail);
        sessionStorage.setItem('staffId', staff.data.id);
        history('/staffsetpwd');
      }
      else if (response.data === 'Success') {
        const staff = await axios.get(`http://localhost:1234/staff/orgemail/${orgemail}`);
        sessionStorage.setItem('staffEmail', orgemail);
        sessionStorage.setItem('staffId', staff.data.id);
        history('/staffhome');
        toast.success("Logged in successfully");
      }
      else {
        setError('Invalid credentials or ' + response.data);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <StaffLogNav />
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Staff Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="orgemail" className="block text-sm font-medium text-gray-700">Organization Email</label>
                <input
                  type="email"
                  id="orgemail"
                  value={orgemail}
                  onChange={(e) => setOrgemail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {password.length > 0 && password.length < 8 && (
                  <p className="text-red-500 text-sm">Password must be at least 8 characters long.</p>
                )}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </form>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/022/187/258/original/delivery-man-3d-icon-illustration-png.png"
              alt="Login Visual"
              className="object-cover w-full h-full max-w-full max-h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default StaffLogin;
