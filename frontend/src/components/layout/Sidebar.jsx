import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 

FiHome, 
FiCalendar, 
FiUsers, 
FiSettings, 
FiUser, 
FiTicket,
FiTrendingUp,
FiMenu,
FiX
} from 'react-icons/fi';

const Sidebar = () => {
const [isCollapsed, setIsCollapsed] = useState(false);
const location = useLocation();

const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/events', icon: FiCalendar, label: 'Events' },
    { path: '/tickets', icon: FiTicket, label: 'My Tickets' },
    { path: '/teams', icon: FiUsers, label: 'Teams' },
    { path: '/analytics', icon: FiTrendingUp, label: 'Analytics' },
    { path: '/profile', icon: FiUser, label: 'Profile' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
];

const isActive = (path) => location.pathname === path;

return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen border-r border-gray-200`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
                {!isCollapsed && (
                    <h2 className="text-xl font-bold text-gray-800">SportsSphere</h2>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
                </button>
            </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
            <ul className="space-y-2">
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center p-3 rounded-lg transition-colors group ${
                                    isActive(item.path)
                                        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                                title={isCollapsed ? item.label : ''}
                            >
                                <IconComponent 
                                    size={20} 
                                    className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`}
                                />
                                {!isCollapsed && (
                                    <span className="font-medium">{item.label}</span>
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
            <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 text-center">
                        © 2024 SportsSphere
                    </p>
                </div>
            </div>
        )}
    </div>
);
};

export default Sidebar;