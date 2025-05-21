import React from 'react';
import { Route, Routes, Link, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Home as IconHome, 
  Users as IconUsers, 
  Calendar as IconCalendar, 
  Trophy as IconTrophy, 
  Shield as IconShield,
  BarChart as IconBarChart, 
  DollarSign as IconDollarSign,
  Bell as IconBell,
  MessageSquare as IconMessageSquare,
  UserPlus as IconUserPlus,
  CalendarPlus as IconCalendarPlus,
  Award as IconAward,
  UserCheck as IconUserCheck
} from 'lucide-react';

// Import dashboard components
import { BarChart, LineChart, DoughnutChart } from '../components/admin/DashboardChart';
import RecentActivity from '../components/admin/RecentActivity';
import DataTable from '../components/admin/DataTable';

const navItems = [
  { name: 'Overview', path: '/admin', icon: <IconHome size={20} /> },
  { name: 'User Management', path: '/admin/users', icon: <IconUsers size={20} /> },
  { name: 'Event Management', path: '/admin/events', icon: <IconCalendar size={20} /> },
  { name: 'Club Management', path: '/admin/clubs', icon: <IconBarChart size={20} /> },
  { name: 'Scholarships & Rewards', path: '/admin/scholarships', icon: <IconTrophy size={20} /> },
  { name: 'Community Moderation', path: '/admin/community', icon: <IconShield size={20} /> },
];

const MetricCard = ({ title, value, icon, description, linkTo, trend, trendValue }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="p-2 bg-blue-100 rounded-full text-blue-600">
        {icon}
      </div>
    </div>
    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <div className="flex items-center mb-4">
      <p className="text-sm text-gray-500 truncate">{description}</p>
      {trend && (
        <span className={`ml-2 text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? '↑' : '↓'} {trendValue}%
        </span>
      )}
    </div>
    {linkTo && (
      <Link to={linkTo} className="text-sm font-medium text-blue-600 hover:text-blue-800 self-start">
        View Details &rarr;
      </Link>
    )}
  </div>
);

const AdminDashboard = () => {
  // Use auth context for user information and authentication status
  const { user, isAuthenticated } = useAuth();
  const adminName = user?.name || "Admin";

  // Mock data for charts
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'User Growth',
        data: [150, 350, 520, 780, 1050, 1250],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const eventDistributionData = {
    labels: ['Sports', 'Workshops', 'Tournaments', 'Training', 'Meetups'],
    datasets: [
      {
        label: 'Events Count',
        data: [35, 12, 18, 25, 8],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1900, 3000, 5000, 8000, 12300],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Mock data for recent activities
  const recentActivities = [
    { 
      icon: <IconUserPlus size={16} />, 
      title: 'New Club Registration', 
      description: 'Alpha Cricket Club has registered on the platform.',
      time: '10 min ago',
      isNew: true 
    },
    { 
      icon: <IconCalendarPlus size={16} />, 
      title: 'New Tournament Created', 
      description: 'Mumbai Tennis Association created the Summer Tournament 2025.',
      time: '2 hours ago',
      isNew: true 
    },
    { 
      icon: <IconAward size={16} />, 
      title: 'Scholarship Application', 
      description: 'Rahul Sharma applied for the National Sports Scholarship.',
      time: '5 hours ago',
      isNew: false 
    },
    { 
      icon: <IconUserCheck size={16} />, 
      title: 'Club Verification Complete', 
      description: 'Delhi Football Club has been verified.',
      time: '1 day ago',
      isNew: false 
    },
    { 
      icon: <IconMessageSquare size={16} />, 
      title: 'New Forum Post', 
      description: 'A new post in Cricket Training Techniques forum needs moderation.',
      time: '1 day ago',
      isNew: false 
    },
  ];

  // Mock data for users table
  const usersData = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', role: 'Athlete', status: 'Active', lastActive: '10 min ago', joined: 'May 15, 2025' },
    { id: 2, name: 'Priya Patel', email: 'priya.p@example.com', role: 'Club Manager', status: 'Active', lastActive: '1 hour ago', joined: 'Jan 10, 2025' },
    { id: 3, name: 'Amit Kumar', email: 'amit.k@example.com', role: 'Athlete', status: 'Inactive', lastActive: '5 days ago', joined: 'Mar 22, 2025' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah.w@example.com', role: 'Admin', status: 'Active', lastActive: '2 hours ago', joined: 'Nov 5, 2024' },
    { id: 5, name: 'John Mathew', email: 'john.m@example.com', role: 'Event Manager', status: 'Active', lastActive: '1 day ago', joined: 'Apr 18, 2025' },
  ];
  
  const userColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status', render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {row.status}
      </span>
    )},
    { key: 'lastActive', label: 'Last Active' },
    { key: 'joined', label: 'Joined Date' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 flex flex-col p-6 fixed h-full z-20 shadow-2xl">
        <div className="mb-10 flex items-center gap-3 px-2">
          <img src="/logo.png" alt="SportsSphere Logo" className="h-10 w-10 rounded-full bg-white p-1" />
          <span className="text-2xl font-bold text-white">Admin Panel</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </ul>
        </nav>
        <div className="mt-10 p-3 bg-slate-700 rounded-lg text-center">
          <p className="text-sm font-medium">SportsSphere Platform</p>
          <p className="text-xs text-slate-400">Version 1.1.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-8 py-5 sticky top-0 z-10 shadow-sm">
          <Link to="/admin" className="text-xl font-semibold text-slate-800 hover:text-blue-700 transition-colors">Admin Dashboard</Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <IconBell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">3</span>
              </button>
            </div>
            <span className="text-slate-600 font-medium">{adminName}</span>
            <img 
              src="/assets/images/admin-avatar.png" 
              alt="Admin Avatar" 
              className="h-10 w-10 rounded-full border-2 border-blue-500 object-cover" 
              onError={(e) => { e.target.onerror = null; e.target.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiNFRUZBRjQiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjIxNjcgMjAgMjQgMTguMjE2NyAyNCAxNkMyNCAxMy43ODM3IDIyLjIxNjcgMTIgMjAgMTJDMTcuNzgzNyAxMiAxNiAxMy43ODM3IDE2IDE2QzE2IDE4LjIxNjcgMTcuNzgzNyAyMCAyMCAyMFoiIGZpbGw9IiNCNUI1RTgiLz4KPHBhdGggZD0iTTMyIDE4QzMyIDE4IDI4IDI0IDIwIDI0QzEyIDI0IDggMTggOCAxOEg5LjVDOS41IDIxLjMzMzMgMTQuMTY2NyAyNCAyMCAyNEMyNS44MzMzIDI0IDMwLjUgMjEuMzMzMyAzMC41IDE4SDMyWiIgZmlsbD0iI0I1QjVFOCIvPgo8L3N2Zz4='; }} 
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 bg-gray-100">
          <Routes>
            <Route path="/" element={
              <section>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome, {adminName}!</h1>
                <p className="text-slate-600 mb-8">Here's an overview of the SportsSphere platform.</p>
                
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <MetricCard 
                    title="Total Users" 
                    value="1,250" 
                    icon={<IconUsers size={24} />} 
                    description="Athletes, Clubs, Organizers" 
                    linkTo="/admin/users" 
                    trend="up" 
                    trendValue="12"
                  />
                  <MetricCard 
                    title="Active Events" 
                    value="78" 
                    icon={<IconCalendar size={24} />} 
                    description="Ongoing and upcoming events" 
                    linkTo="/admin/events"
                    trend="up" 
                    trendValue="5"
                  />
                  <MetricCard 
                    title="Registered Clubs" 
                    value="340" 
                    icon={<IconBarChart size={24} />} 
                    description="Across various sports" 
                    linkTo="/admin/clubs"
                    trend="up" 
                    trendValue="8"
                  />
                  <MetricCard 
                    title="Pending Scholarships" 
                    value="15" 
                    icon={<IconTrophy size={24} />} 
                    description="Applications awaiting review" 
                    linkTo="/admin/scholarships"
                  />
                  <MetricCard 
                    title="Community Health" 
                    value="95%" 
                    icon={<IconShield size={24} />} 
                    description="Moderation activity positive" 
                    linkTo="/admin/community"
                    trend="up" 
                    trendValue="3"
                  />
                  <MetricCard 
                    title="Platform Revenue" 
                    value="$12,300" 
                    icon={<IconDollarSign size={24} />} 
                    description="Last 30 days"
                    trend="up" 
                    trendValue="15"
                  />
                </div>

                {/* Charts and activity feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <LineChart 
                        title="User Growth" 
                        data={userGrowthData} 
                        options={{
                          scales: { y: { beginAtZero: true } },
                          plugins: { legend: { display: true } },
                          responsive: true,
                          maintainAspectRatio: false
                        }} 
                      />
                      <BarChart 
                        title="Revenue (Last 6 Months)" 
                        data={revenueData} 
                        options={{
                          scales: { y: { beginAtZero: true } },
                          plugins: { legend: { display: true } },
                          responsive: true,
                          maintainAspectRatio: false
                        }} 
                      />
                      <DoughnutChart 
                        title="Event Distribution" 
                        data={eventDistributionData} 
                        options={{
                          plugins: { legend: { position: 'right' } },
                          responsive: true,
                          maintainAspectRatio: false
                        }} 
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-1">
                    <RecentActivity activities={recentActivities} />
                  </div>
                </div>

                {/* Recent users table */}
                <div className="mb-8">
                  <DataTable 
                    title="Recent Users"
                    data={usersData}
                    columns={userColumns}
                    filterPlaceholder="Search users..."
                  />
                </div>
              </section>
            } />

            <Route path="/users" element={
              <section>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">User Management</h1>
                <p className="text-slate-600 mb-8">Manage athlete, club, and admin profiles.</p>
                
                <DataTable 
                  title="All Users"
                  data={usersData}
                  columns={userColumns}
                  filterPlaceholder="Search users..."
                />
              </section>
            } />

            <Route path="/events" element={<ContentSection title="Event Management" description="Create, update, or delete events. Monitor registrations and real-time updates. Manage event logistics and notifications." />} />
            <Route path="/clubs" element={<ContentSection title="Club Management" description="Oversee club listings, membership approvals, and training programs. Assign trainers and manage club events." />} />
            <Route path="/scholarships" element={<ContentSection title="Scholarships & Rewards" description="Review scholarship applications, disburse funds, and track government rewards. Integrate with government APIs for transparency." />} />
            <Route path="/community" element={<ContentSection title="Community Moderation" description="Moderate forums, manage reports, and oversee live chat. Ensure a safe and positive community environment." />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <li>
      <Link
        to={item.path}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out 
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
      >
        <span className={`${isActive ? 'text-white' : 'text-slate-400'}`}>{item.icon}</span>
        <span>{item.name}</span>
      </Link>
    </li>
  );
};

const ContentSection = ({ title, description }) => (
  <section className="bg-white rounded-xl shadow-xl p-8">
    <h2 className="text-2xl font-bold mb-3 text-slate-800">{title}</h2>
    <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
    <div className="border-t border-gray-200 pt-6">
      <div className="min-h-[300px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-lg italic">[Content for {title} will be displayed here]</p>
      </div>
    </div>
  </section>
);

// No need for admin routes as we've already defined them in the dashboard component
// The admin routes are handled within the AdminDashboard component

export default AdminDashboard;