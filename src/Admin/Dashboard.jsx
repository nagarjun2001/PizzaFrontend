// import React from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../images/logoHD.jpg';
// import SalesReport from './SalesReport';
// import AdminNavbar from '../Navbar/AdminNavbar';

// const Dashboard = () => {
//   return (
//     <>
//     <AdminNavbar />
//     <div className="bg-white text-gray-800 min-h-screen">
//       <main className="container mx-auto py-8">
//         <h2 className="text-2xl font-semibold mb-6">Welcome, Admin</h2>
//         <h2 className="text-2xl font-semibold mb-6">Admin Functions</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Link to="/managestaff" className="bg-red-600 text-white p-6 rounded-lg shadow-lg hover:bg-red-700 transition">
//             Manage Staff
//           </Link>
//           <Link to="/stock" className="bg-red-600 text-white p-6 rounded-lg shadow-lg hover:bg-red-700 transition">
//             Manage Stock
//           </Link>
//           <Link to="/manageorders" className="bg-red-600 text-white p-6 rounded-lg shadow-lg hover:bg-red-700 transition">
//             Manage Orders
//           </Link>
//           <Link to="/managefood" className="bg-red-600 text-white p-6 rounded-lg shadow-lg hover:bg-red-700 transition">
//             Manage Food
//           </Link>
//         </div>
//       </main>
//     </div><SalesReport />
//     </>
//   );
// };

// export default Dashboard;

// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';
import SalesReport from './SalesReport';

const Dashboard = () => {
  return (
    <>
      <AdminNavbar />
      <div className="bg-white text-gray-800 min-h-screen">
        <main className="container mx-auto py-8">
          <h2 className="text-2xl font-semibold mb-6">Welcome, Admin</h2>
          <h2 className="text-2xl font-semibold mb-6">Admin Functions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/managestaff" className="bg-red-600 text-white p-6 rounded-lg shadow-lg hover:bg-red-700 transition">
              Manage Staff
            </Link>
            <Link to="/stock" className="bg-red-600 text-white p-6 rounded-lg shadow-lg hover:bg-red-700 transition">
              Manage Stock
            </Link>
            <Link to="/manageorders" className="bg-red-600 text-white p-6 rounded-lg shadow-lg hover:bg-red-700 transition">
              Manage Orders
            </Link>
            <Link to="/managefood" className="bg-red-600 text-white p-6 rounded-lg shadow-lg hover:bg-red-700 transition">
              Manage Food
            </Link>
          </div>
        </main>
        <SalesReport />
      </div>
    </>
  );
};

export default Dashboard;
