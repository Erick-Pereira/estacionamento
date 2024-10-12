import React from 'react';
import { FaCar, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-gray-100 text-gray-600 fixed top-0 left-0 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="p-4 flex items-center space-x-2">
        {/*<img src="../images/car-icon.png" alt="Logo" className="w-8 h-8" />*/}
          <span className="text-2xl font-bold text-black">
            Park.<span className="text-red-500">me</span>
          </span>
        </div>

        {/* Menu */}
        <nav className="mt-10">
          <ul>
            <li className="p-4 flex items-center space-x-2 hover:bg-gray-200">
              <FaChartBar size={20} color="gray" />
              <a href="#" className="text-lg">Análises</a>
            </li>
            <li className="p-4 flex items-center space-x-2 hover:bg-gray-200">
              <FaCar size={20} color="gray" />
              <a href="#" className="text-lg">Carros</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 flex items-center space-x-2 hover:bg-gray-200">
        <FaSignOutAlt size={20} color="gray" />
        <a href="#" className="text-lg">Sair</a>
      </div>
    </aside>
  );
};

export default Sidebar;