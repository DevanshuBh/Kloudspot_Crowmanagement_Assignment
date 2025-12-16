import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, ReferenceLine } from 'recharts';
import { Home, Users, LogOut, MapPin, ChevronDown, Calendar, Bell, Menu, TrendingUp, TrendingDown, Cloud } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({ liveOccupancy: 734, todaysFootfall: 2436, avgDwellTime: '08min 30sec' });
    const navigate = useNavigate();
    const location = useLocation();

    const occupancyData = [
        { time: '8:00', occupancy: 140 },
        { time: '9:00', occupancy: 145 },
        { time: '10:00', occupancy: 152 },
        { time: '11:00', occupancy: 158 },
        { time: '12:00', occupancy: 165 },
        { time: '13:00', occupancy: 172 },
        { time: '14:00', occupancy: 178 },
        { time: '15:00', occupancy: 182 },
        { time: '16:00', occupancy: 190 },
        { time: '17:00', occupancy: 188 },
        { time: '18:00', occupancy: 185 },
    ];

    // Initial demographics data
    const demographicsData = [
        { time: '8:00', male: 175, female: 135 },
        { time: '9:00', male: 180, female: 138 },
        { time: '10:00', male: 185, female: 140 },
        { time: '11:00', male: 188, female: 142 },
        { time: '12:00', male: 195, female: 148 },
        { time: '13:00', male: 200, female: 150 },
        { time: '14:00', male: 190, female: 145 },
        { time: '15:00', male: 202, female: 152 },
        { time: '16:00', male: 208, female: 155 },
        { time: '17:00', male: 202, female: 150 },
        { time: '18:00', male: 205, female: 155 },
        { time: '19:00', male: 215, female: 160 },
    ];

    // Data for demographics donut chart
    const donutData = [
        { name: 'Male', value: 55, color: '#68a6a1' }, // Darker Teal
        { name: 'Female', value: 45, color: '#bce3e1' }  // Light Blue/Teal
    ];

    useEffect(() => {
        // Initial fetch
        axios.post('http://localhost:8080/api/analytics/summary')
            .then(res => setStats(res.data))
            .catch(err => console.log('Using mock data'));

        // Socket connection
        const socket = io('http://localhost:9092', { transports: ['websocket'] });
        socket.on('live_occupancy', (data) => {
            setStats(prev => ({ ...prev, liveOccupancy: data.count }));
        });
        return () => socket.disconnect();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Custom Tick for Y-Axis
    const CustomYAxisTick = (props) => {
        const { x, y, payload } = props;
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#9ca3af" fontSize={12}>
                    {payload.value}
                </text>
            </g>
        );
    };

    // Custom Label for Reference Line
    // Renders a horizontal bar and vertical dashed line
    const CustomReferenceLabel = (props) => {
        const { viewBox } = props;
        const x = viewBox.x;
        const y = viewBox.y;

        return (
            <g transform={`translate(${x}, ${y})`}>
                {/* Horizontal Indicator Bar */}
                <line x1={-15} y1={10} x2={15} y2={10} stroke="#ef4444" strokeWidth={6} strokeLinecap="round" />
                {/* Vertical Dashed Line */}
                <line x1={0} y1={10} x2={0} y2={250} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={2.5} />
            </g>
        );
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

                {/* Dashboard Content */}
                <main className="p-8 overflow-y-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            Today
                        </button>
                    </div>

                    <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">Occupancy</p>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <div className="dashboard-card">
                            <p className="text-sm text-gray-500 mb-1">Live Occupancy</p>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">{stats.liveOccupancy}</h3>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-green-500">
                                <TrendingUp className="w-4 h-4" />
                                <span>10% More than yesterday</span>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <p className="text-sm text-gray-500 mb-1">Today's Footfall</p>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">{stats.todaysFootfall.toLocaleString()}</h3>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-red-500">
                                <TrendingDown className="w-4 h-4" />
                                <span>10% Less than yesterday</span>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <p className="text-sm text-gray-500 mb-1">Avg Dwell Time</p>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">{stats.avgDwellTime}</h3>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-green-500">
                                <TrendingUp className="w-4 h-4" />
                                <span>6% More than yesterday</span>
                            </div>
                        </div>
                    </div>

                    {/* Overall Occupancy Chart */}
                    <div className="dashboard-card mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-gray-900 font-semibold">Overall Occupancy</h3>
                            <div className="flex items-center gap-2">
                                <span className="bg-[#338a83] w-3 h-3 rounded-full"></span>
                                <span className="text-sm text-gray-500">Occupancy</span>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={occupancyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#338a83" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#338a83" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                    <Area type="monotone" dataKey="occupancy" stroke="#338a83" strokeWidth={2} fill="url(#colorOccupancy)" />
                                    <ReferenceLine x="17:00" stroke="transparent" label={<CustomReferenceLabel />} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">Demographics</p>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Donut Chart with Breakdown */}
                        <div className="dashboard-card flex flex-col">
                            <h4 className="text-left text-gray-900 font-semibold mb-6">Chart of Demographics</h4>
                            <div className="flex gap-8 items-center">
                                <div className="relative w-48 h-48 flex-shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={donutData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={65}
                                                outerRadius={85}
                                                dataKey="value"
                                                startAngle={90}
                                                endAngle={-270}
                                                stroke="none"
                                            >
                                                {donutData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-xs text-gray-500 font-medium">Total Crowd</span>
                                        <span className="text-xl font-bold text-gray-900">100%</span>
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <Users className="w-6 h-6 text-[#68a6a1]" /> {/* Using Users icon as generic male/female placeholder */}
                                        <span className="font-bold text-gray-800 text-lg">55% <span className="text-sm font-normal text-gray-600">Males</span></span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users className="w-6 h-6 text-[#bce3e1]" />
                                        <span className="font-bold text-gray-800 text-lg">45% <span className="text-sm font-normal text-gray-600">Females</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Line Chart */}
                        <div className="dashboard-card">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-gray-900 font-semibold">Demographics Analysis</h4>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#68a6a1]"></span>
                                        <span className="text-xs text-gray-500">Male</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#bce3e1]"></span>
                                        <span className="text-xs text-gray-500">Female</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={demographicsData}>
                                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
                                        <Line type="monotone" dataKey="male" stroke="#68a6a1" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="female" stroke="#bce3e1" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
