import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Home, Users, LogOut, MapPin, ChevronDown, Bell, Cloud, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const CrowdEntries = () => {
    const [entries, setEntries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Initial mock data for development
        const mockEntries = [
            { id: '1', name: 'Alice Johnson', sex: 'Female', entry: '11:05 AM', exit: '--', dwell: '--', color: 'bg-blue-500' },
            { id: '2', name: 'Brian Smith', sex: 'Male', entry: '11:03 AM', exit: '--', dwell: '--', color: 'bg-green-500' },
            { id: '3', name: 'David Brown', sex: 'Male', entry: '10:50 AM', exit: '11:10 AM', dwell: '00:20', color: 'bg-pink-500' },
            // Added more rows to demonstrate pagination look
            { id: '4', name: 'Eva White', sex: 'Female', entry: '11:20 AM', exit: '11:30 AM', dwell: '00:10', color: 'bg-blue-500' },
            { id: '5', name: 'Frank Green', sex: 'Male', entry: '11:50 AM', exit: '12:10 AM', dwell: '00:20', color: 'bg-green-500' },
        ];
        setEntries(mockEntries);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="flex bg-[#f8f9fa] min-h-screen">
            {/* Sidebar */}
            <aside className="sidebar flex flex-col shadow-lg">
                <div className="h-16 flex items-center gap-3 px-6 border-b border-white/10">
                    <Cloud className="w-6 h-6 text-white" fill="white" />
                    <span className="text-white text-xl font-bold tracking-tight">kloudspot</span>
                    <Menu className="w-5 h-5 text-white/70 ml-auto" />
                </div>

                <nav className="flex-1 py-6 space-y-1">
                    <Link to="/dashboard" className={`sidebar-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                        <Home className="w-5 h-5" />
                        <span>Overview</span>
                    </Link>
                    <Link to="/crowd-entries" className={`sidebar-item ${location.pathname === '/crowd-entries' ? 'active' : ''}`}>
                        <Users className="w-5 h-5" />
                        <span>Crowd Entries</span>
                    </Link>
                </nav>

                <div className="p-4">
                    <button onClick={handleLogout} className="sidebar-item w-full">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
                    <div className="flex items-center gap-8">
                        <span className="font-semibold text-gray-800 text-lg">Crowd Solutions</span>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50">
                            <MapPin className="w-4 h-4 text-kloudspot-teal" />
                            <span>Avenue Mall</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center bg-gray-100 rounded-full px-1 p-0.5 border border-gray-200">
                            <span className="px-2 py-0.5 text-xs font-bold text-gray-600">En</span>
                            <span className="text-gray-300">|</span>
                            <span className="px-2 py-0.5 text-xs text-gray-400">ε</span>
                        </div>
                        <div className="relative cursor-pointer">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-[#f97316] flex items-center justify-center text-white font-medium text-sm shadow-sm ring-2 ring-white">
                            PS
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Overview</h2>

                    <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Sex</th>
                                    <th>Entry</th>
                                    <th>Exit</th>
                                    <th>Dwell Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((entry) => (
                                    <tr key={entry.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${entry.color}`}>
                                                    {entry.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="font-medium">{entry.name}</span>
                                            </div>
                                        </td>
                                        <td>{entry.sex}</td>
                                        <td>{entry.entry}</td>
                                        <td>{entry.exit}</td>
                                        <td>{entry.dwell}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Grid */}
                        <div className="pagination-container border-t border-gray-100">
                            <button className="page-btn"><ChevronLeft className="w-4 h-4" /></button>
                            <button className="page-btn active">1</button>
                            <button className="page-btn">2</button>
                            <button className="page-btn">3</button>
                            <span className="text-gray-400 px-2">...</span>
                            <button className="page-btn">5</button>
                            <button className="page-btn"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CrowdEntries;
