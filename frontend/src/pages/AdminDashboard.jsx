import React from "react";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Bell as IconBell,
  Users as IconUsers,
  Calendar as IconCalendar,
  BarChart as IconBarChart,
  Trophy as IconTrophy,
  Shield as IconShield,
  DollarSign as IconDollarSign,
  UserPlus as IconUserPlus,
  CalendarPlus as IconCalendarPlus,
  Award as IconAward,
  UserCheck as IconUserCheck,
  MessageSquare as IconMessageSquare,
} from "react-feather";

// Define navigation items for sidebar
const navItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <IconBarChart size={18} />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <IconUsers size={18} />,
  },
  {
    name: "Events",
    path: "/admin/events",
    icon: <IconCalendar size={18} />,
  },
  {
    name: "Clubs",
    path: "/admin/clubs",
    icon: <IconUsers size={18} />,
  },
  {
    name: "Scholarships",
    path: "/admin/scholarships",
    icon: <IconTrophy size={18} />,
  },
  {
    name: "Community",
    path: "/admin/community",
    icon: <IconMessageSquare size={18} />,
  },
];

const MetricCard = ({ title, value, icon, description, linkTo, trend, trendValue }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="p-2 bg-blue-100 rounded-full text-blue-600">{icon}</div>
    </div>
    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <div className="flex items-center mb-4">
      <p className="text-sm text-gray-500 truncate">{description}</p>
      {trend && (
        <span className={`ml-2 text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
          {trend === "up" ? "↑" : "↓"} {trendValue}%
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

// Chart Components
// eslint-disable-next-line no-unused-vars
const LineChart = ({ title, data, options }) => (
  <div className="bg-white p-4 rounded-lg shadow-md h-64">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
    <div className="h-48">
      {/* Chart would be rendered here using a library like Chart.js */}
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Chart visualization placeholder</p>
      </div>
    </div>
  </div>
);

// eslint-disable-next-line no-unused-vars
const BarChart = ({ title, data, options }) => (
  <div className="bg-white p-4 rounded-lg shadow-md h-64">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
    <div className="h-48">
      {/* Chart would be rendered here using a library like Chart.js */}
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Bar chart visualization placeholder</p>
      </div>
    </div>
  </div>
);

// eslint-disable-next-line no-unused-vars
const DoughnutChart = ({ title, data, options }) => (
  <div className="bg-white p-4 rounded-lg shadow-md h-64">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
    <div className="h-48">
      {/* Chart would be rendered here using a library like Chart.js */}
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Doughnut chart visualization placeholder</p>
      </div>
    </div>
  </div>
);

// Recent Activity Component
const RecentActivity = ({ activities }) => (
  <div className="bg-white rounded-lg shadow-md">
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700">Recent Activity</h3>
    </div>
    <div className="p-4">
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li key={index} className="flex gap-4 items-start">
            <div className="p-2 bg-blue-100 rounded-full text-blue-600">{activity.icon}</div>
            <div>
              <div className="flex items-center">
                <h4 className="font-medium text-slate-800">{activity.title}</h4>
                {activity.isNew && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    New
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Data Table Component
const DataTable = ({ title, data, columns, filterPlaceholder }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className="relative">
          <input
            type="text"
            placeholder={filterPlaceholder || "Search..."}
            className="pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <span className="absolute left-2.5 top-2.5 text-gray-400">{/* Search icon would be here */}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={`${row.id}-${column.key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Content Section Component
const ContentSection = ({ title, description }) => (
  <section>
    <h1 className="text-3xl font-bold text-slate-800 mb-2">{title}</h1>
    <p className="text-slate-600 mb-8">{description}</p>
    <div className="bg-white p-8 rounded-lg shadow-md">
      <p className="text-center text-lg text-gray-500">This section is under development</p>
    </div>
  </section>
);

const AdminDashboard = () => {
  // Use auth context for user information and authentication status
  const { user } = useAuth();
  const adminName = user?.name || "Admin";

  // Mock data for charts
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [150, 350, 520, 780, 1050, 1250],
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const eventDistributionData = {
    labels: ["Sports", "Workshops", "Tournaments", "Training", "Meetups"],
    datasets: [
      {
        label: "Events Count",
        data: [35, 12, 18, 25, 8],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 3000, 5000, 8000, 12300],
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Mock data for recent activities
  const recentActivities = [
    {
      icon: <IconUserPlus size={16} />,
      title: "New Club Registration",
      description: "Alpha Cricket Club has registered on the platform.",
      time: "10 min ago",
      isNew: true,
    },
    {
      icon: <IconCalendarPlus size={16} />,
      title: "New Tournament Created",
      description: "Mumbai Tennis Association created the Summer Tournament 2025.",
      time: "2 hours ago",
      isNew: true,
    },
    {
      icon: <IconAward size={16} />,
      title: "Scholarship Application",
      description: "Rahul Sharma applied for the National Sports Scholarship.",
      time: "5 hours ago",
      isNew: false,
    },
    {
      icon: <IconUserCheck size={16} />,
      title: "Club Verification Complete",
      description: "Delhi Football Club has been verified.",
      time: "1 day ago",
      isNew: false,
    },
    {
      icon: <IconMessageSquare size={16} />,
      title: "New Forum Post",
      description: "A new post in Cricket Training Techniques forum needs moderation.",
      time: "1 day ago",
      isNew: false,
    },
  ];

  // Mock data for users table
  const usersData = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.s@example.com",
      role: "Athlete",
      status: "Active",
      lastActive: "10 min ago",
      joined: "May 15, 2025",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.p@example.com",
      role: "Club Manager",
      status: "Active",
      lastActive: "1 hour ago",
      joined: "Jan 10, 2025",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.k@example.com",
      role: "Athlete",
      status: "Inactive",
      lastActive: "5 days ago",
      joined: "Mar 22, 2025",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      role: "Admin",
      status: "Active",
      lastActive: "2 hours ago",
      joined: "Nov 5, 2024",
    },
    {
      id: 5,
      name: "John Mathew",
      email: "john.m@example.com",
      role: "Event Manager",
      status: "Active",
      lastActive: "1 day ago",
      joined: "Apr 18, 2025",
    },
  ];

  const userColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${row.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "lastActive", label: "Last Active" },
    { key: "joined", label: "Joined Date" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 flex flex-col p-6 fixed h-full z-20 shadow-2xl">
        {" "}
        <div className="mb-10 flex items-center gap-3 px-2">
          <img
            src="/sportssphere-logo.svg"
            alt="SportsSphere Logo"
            className="h-12 w-12 rounded-full bg-white p-1 shadow-lg"
            style={{ filter: "drop-shadow(0px 2px 4px rgba(255, 255, 255, 0.2))" }}
          />
          <div>
            <span className="text-2xl font-bold text-white">Admin Panel</span>
            <div className="text-xs text-blue-200">SportsSphere Management</div>
          </div>
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
          <Link to="/admin" className="text-xl font-semibold text-slate-800 hover:text-blue-700 transition-colors">
            Admin Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <IconBell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                  3
                </span>
              </button>
            </div>
            <span className="text-slate-600 font-medium">{adminName}</span>
            <img
              src="/assets/images/admin-avatar.png"
              alt="Admin Avatar"
              className="h-10 w-10 rounded-full border-2 border-blue-500 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiNFRUZBRjQiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjIxNjcgMjAgMjQgMTguMjE2NyAyNCAxNkMyNCAxMy43ODM3IDIyLjIxNjcgMTIgMjAgMTJDMTcuNzgzNyAxMiAxNiAxMy43ODM3IDE2IDE2QzE2IDE4LjIxNjcgMTcuNzgzNyAyMCAyMCAyMFoiIGZpbGw9IiNCNUI1RTgiLz4KPHBhdGggZD0iTTMyIDE4QzMyIDE4IDI4IDI0IDIwIDI0QzEyIDI0IDggMTggOCAxOEg5LjVDOS41IDIxLjMzMzMgMTQuMTY2NyAyNCAyMCAyNEMyNS44MzMzIDI0IDMwLjUgMjEuMzMzMyAzMC41IDE4SDMyWiIgZmlsbD0iI0I1QjVFOCIvPgo8L3N2Zz4=";
              }}
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 bg-gray-100">
          <Routes>
            <Route
              path="/"
              element={
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
                            maintainAspectRatio: false,
                          }}
                        />
                        <BarChart
                          title="Revenue (Last 6 Months)"
                          data={revenueData}
                          options={{
                            scales: { y: { beginAtZero: true } },
                            plugins: { legend: { display: true } },
                            responsive: true,
                            maintainAspectRatio: false,
                          }}
                        />
                        <DoughnutChart
                          title="Event Distribution"
                          data={eventDistributionData}
                          options={{
                            plugins: { legend: { position: "right" } },
                            responsive: true,
                            maintainAspectRatio: false,
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
              }
            />

            <Route
              path="/users"
              element={
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
              }
            />

            <Route
              path="/events"
              element={
                <ContentSection
                  title="Event Management"
                  description="Create, update, or delete events. Monitor registrations and real-time updates. Manage event logistics and notifications."
                />
              }
            />
            <Route
              path="/clubs"
              element={
                <ContentSection
                  title="Club Management"
                  description="Oversee club listings, membership approvals, and training programs. Assign trainers and manage club events."
                />
              }
            />
            <Route
              path="/scholarships"
              element={
                <ContentSection
                  title="Scholarships & Rewards"
                  description="Review scholarship applications, disburse funds, and track government rewards. Integrate with government APIs for transparency."
                />
              }
            />
            <Route
              path="/community"
              element={
                <ContentSection
                  title="Community Moderation"
                  description="Moderate forums, manage reports, and oversee live chat. Ensure a safe and positive community environment."
                />
              }
            />
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
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
      >
        <span className={`${isActive ? "text-white" : "text-slate-400"}`}>{item.icon}</span>
        <span>{item.name}</span>
      </Link>
    </li>
  );
};

export default AdminDashboard;
