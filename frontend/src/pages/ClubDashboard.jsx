import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
   Users,
   Calendar,
   Award,
   Bell,
   Settings,
   DollarSign,
   User,
   UserPlus,
   Activity,
   Clipboard,
   Shield,
} from "react-feather";
import MainLayout from "../components/layout/MainLayout";
import DashboardMetrics from "../components/club/ClubDashboard";

const ClubDashboard = () => {
   const [stats, setStats] = useState({
      totalMembers: 156,
      activeTeams: 8,
      upcomingEvents: 3,
      revenue: 12500,
   });

   const [recentActivities] = useState([
      { id: 1, type: "new_member", message: "New member joined Team Alpha", time: "2 hours ago" },
      { id: 2, type: "event", message: "Tournament registration opened", time: "5 hours ago" },
      { id: 3, type: "payment", message: "Monthly subscription renewed", time: "1 day ago" },
   ]);

   const [notifications] = useState([
      { id: 1, message: "Team practice schedule updated", type: "info", time: "1h ago" },
      { id: 2, message: "New membership request", type: "alert", time: "2h ago" },
      { id: 3, message: "Tournament registration deadline", type: "warning", time: "3h ago" },
   ]);

   const metricsData = {
      members: stats.totalMembers,
      teams: stats.activeTeams,
      events: stats.upcomingEvents,
      revenue: stats.revenue,
   };

   return (
      <MainLayout>
         <div className="p-6">
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-800">Club Dashboard</h1>
               <p className="text-gray-600">Welcome back, Club Admin</p>
            </div>

            {/* Dashboard Metrics */}
            <div className="mb-8">
               <DashboardMetrics data={metricsData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Quick Actions */}
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-4">
                     {[
                        { icon: UserPlus, label: "Add Member", color: "bg-blue-100 text-blue-600" },
                        { icon: Calendar, label: "Schedule Event", color: "bg-purple-100 text-purple-600" },
                        { icon: Award, label: "Create Team", color: "bg-green-100 text-green-600" },
                        { icon: Activity, label: "View Reports", color: "bg-yellow-100 text-yellow-600" },
                     ].map((action, index) => (
                        <motion.button
                           key={index}
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           className={`${action.color} p-4 rounded-lg flex flex-col items-center justify-center`}
                        >
                           <action.icon size={20} />
                           <span className="text-sm mt-2">{action.label}</span>
                        </motion.button>
                     ))}
                  </div>
               </div>

               {/* Recent Activity */}
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                     {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                           <div className="bg-gray-100 p-2 rounded-full">
                              <Activity size={16} className="text-gray-600" />
                           </div>
                           <div>
                              <p className="text-sm text-gray-800">{activity.message}</p>
                              <span className="text-xs text-gray-500">{activity.time}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Notifications */}
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                  <div className="space-y-4">
                     {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start space-x-3">
                           <div
                              className={`p-2 rounded-full ${
                                 notification.type === "alert"
                                    ? "bg-red-100"
                                    : notification.type === "warning"
                                      ? "bg-yellow-100"
                                      : "bg-blue-100"
                              }`}
                           >
                              <Bell
                                 size={16}
                                 className={
                                    notification.type === "alert"
                                       ? "text-red-600"
                                       : notification.type === "warning"
                                         ? "text-yellow-600"
                                         : "text-blue-600"
                                 }
                              />
                           </div>
                           <div>
                              <p className="text-sm text-gray-800">{notification.message}</p>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </MainLayout>
   );
};

export default ClubDashboard;
