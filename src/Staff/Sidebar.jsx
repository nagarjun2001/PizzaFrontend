import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  return (
    <nav className="bg-gray-200 w-64 p-4">
      <ul>
        <li>
          <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
        </li>
        {role === 'Chef' && (
          <li>
            <Link to="/inventory" className="text-blue-600 hover:underline">Inventory</Link>
          </li>
        )}
        <li>
          <Link to="/orders" className="text-blue-600 hover:underline">Orders</Link>
        </li>
        <li>
          <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
