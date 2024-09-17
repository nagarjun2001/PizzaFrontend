// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import UNav from '../Navbar/UNav';
// import ULogNav from '../Navbar/ULogNav';

// const emailValidation = (email) => {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// };

// const passwordValidation = (password) => {
//   const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return regex.test(password);
// };

// const CustomerLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [apiError, setApiError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setEmailError('');
//     setPasswordError('');
//     setApiError('');

//     if (!emailValidation(email)) {
//         setLoading(false);
//         setEmailError('Invalid email address.');
//         return;
//     }
//     if (!passwordValidation(password)) {
//         setLoading(false);
//         setPasswordError('Password must be at least 8 characters long, include letters, numbers, and special characters.');
//         return;
//     }

//     try {
//         const response = await axios.post("http://localhost:1234/customer/login", { email, password });
//         const responseData = response.data;

//         if (responseData.startsWith("Success:")) {
//             const custid = responseData.split(":")[1];
//             sessionStorage.setItem("custid", custid);
            
//             toast.success("Login Success");
//             navigate("/homepage");
//         } else {
//             toast.error("Please check your credentials");
//         }
//     } catch (error) {
//         if (error.response) {
//             const { status, data } = error.response;
//             if (status === 401) {
//                 toast.error(data || "Invalid credentials. Please try again.");
//             } else if (status === 404) {
//                 toast.error(data || "Customer not found.");
//             } else {
//                 toast.error("An error occurred. Please try again.");
//             }
//         } else if (error.request) {
//             toast.error("No response from the server. Please check your connection.");
//         } else {
//             toast.error("An unexpected error occurred.");
//         }
//     } finally {
//         setLoading(false);
//     }
// };
//   return (
//     <>
//       <ULogNav />
//       <div className="flex items-center justify-center min-h-screen bg-white">
//         <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
//           <h1 className="text-3xl font-bold mb-6 text-center">Pizza Shop Login</h1>
//           <form onSubmit={handleSubmit}>
//             <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md mb-4 text-gray-900" />
//             {emailError && <p className="text-white text-sm mb-4">{emailError}</p>}

//             <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md mb-4 text-gray-900" />
//             {passwordError && <p className="text-white text-sm mb-4">{passwordError}</p>}

//             {apiError && <p className="text-white text-sm mb-4">{apiError}</p>}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full p-3 bg-white text-red-500 font-semibold rounded-md hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center"
//             >
//               {loading && <svg className="animate-spin h-5 w-5 mr-3 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 01-8 8z"></path></svg>}
//               {!loading && 'Login'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomerLogin;

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ULogNav from '../Navbar/ULogNav';

// Helper functions for validation
const emailValidation = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const passwordValidation = (password) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailError('');
    setPasswordError('');
    setApiError('');

    if (!emailValidation(email)) {
        setLoading(false);
        setEmailError('Invalid email address.');
        toast.error('Invalid email address.');
        return;
    }
    if (!passwordValidation(password)) {
        setLoading(false);
        setPasswordError('Password must be at least 8 characters long, include letters, numbers, and special characters.');
        toast.error('Password must be at least 8 characters long, include letters, numbers, and special characters.');
        return;
    }

    try {
        const response = await axios.post("http://localhost:1234/customer/login", { email, password });
        const responseData = response.data;

        if (responseData.startsWith("Success:")) {
            const custid = responseData.split(":")[1];
            sessionStorage.setItem("custid", custid);

            toast.success("Login Success!");
            navigate("/homepage");
        } else {
            toast.error("Login failed. Please check your credentials.");
        }
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 401) {
                toast.error(data || "Invalid credentials. Please try again.");
            } else if (status === 404) {
                toast.error(data || "Customer not found.");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        } else if (error.request) {
            toast.error("No response from the server. Please check your connection.");
        } else {
            toast.error("An unexpected error occurred.");
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <ULogNav />
      <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/close-up-pizza-levitate-new-year-theme-red-background-with-gold-bohem-effect_916626-8546.jpg')" }}>
        <div className="absolute inset-0 bg-opacity-50"></div>
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <div className="bg-white p-8 mt-9 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Pizza Shop Login</h1>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full p-3 border rounded-md mb-4 ${emailError ? 'border-red-500' : 'border-gray-300'} text-gray-900`}
                placeholder="Enter your email"
              />
              {emailError && <p className="text-red-500 text-sm mb-4">{emailError}</p>}

              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 border rounded-md mb-4 ${passwordError ? 'border-red-500' : 'border-gray-300'} text-gray-900`}
                placeholder="Enter your password"
              />
              {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}

              {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full p-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 disabled:opacity-50 flex items-center justify-center"
              >
                {loading && <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 01-8 8z"></path></svg>}
                {!loading && 'Login'}
              </button>
            </form> <br />
            <div className='flex justify-center'>
              <span className='text-center text-sm'>Are you a PizzaMan Staff? <Link className='text-blue-500' to='/stafflogin'>Login here</Link></span>
              <span className='text-center text-sm'>Are you an Admin? <Link className='text-blue-500' to='/adminlogin'>Login here</Link></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerLogin;
  