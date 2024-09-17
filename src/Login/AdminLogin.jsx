// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import AdminLogNav from '../Navbar/AdminLogNav';

// const AdminLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     try {
//       axios.post('http://localhost:1234/admin/login', {
//         username,
//         password
//       })
//       .then((res) => {
//         if(res.data == "Success"){
//             setMessage(res.data);
//             toast.success("Login Success");
//             navigate('/dashboard');
//         }
//         else{
//           toast.error("Please check your credentials!");
//         }
//       })
//     } catch (error) {
//       toast.error('Login failed');
//       setMessage('Login failed');
//     }
//   };

//   return (
//     <><AdminLogNav /><div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required />
//           </div>
//           <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">
//             Login
//           </button>
//           {message && <p className="mt-4 text-center text-red-500">{message}</p>}
//         </form>
//       </div>
//     </div></>
//   );
// };

// export default AdminLogin;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AdminLogNav from '../Navbar/AdminLogNav';

const validatePassword = (password) => {
  const minLength = 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/g;
  const hasNumber = /[0-9]/g;
  const hasLetter = /[a-zA-Z]/g;

  if (password.length < minLength) return "Password must be at least 8 characters long.";
  if (!hasSpecialChar.test(password)) return "Password must contain at least one special character.";
  if (!hasNumber.test(password)) return "Password must contain at least one number.";
  if (!hasLetter.test(password)) return "Password must contain at least one letter.";

  return "";
};

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordValidationMessage = validatePassword(password);
    
    if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:1234/admin/login', {
        username,
        password
      });
      if (response.data === "Success") {
        toast.success("Login Success");
        navigate('/dashboard');
      } else {
        toast.error("Invalid credentials. Please try again.");
        setMessage("Invalid credentials");
      }
    } catch (error) {
      toast.error('Login failed. Please try again later.');
      setMessage('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminLogNav />
      <div className="h-screen flex items-center justify-center overflow-hidden">
        <div className="flex w-full max-w-2xl bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="w-full sm:w-1/2 p-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
              Admin Login
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  required
                />
                {passwordError && (
                  <p className="mt-2 text-sm text-red-600">
                    {passwordError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
          <div className="hidden sm:block sm:w-1/2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/036/123/036/original/admin-3d-illustration-icon-png.png"
              alt="Admin"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
