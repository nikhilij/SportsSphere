import React from "react";
import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Users, Calendar } from "react-feather";

const DashboardMetrics = ({ data }) => {
   const MetricCard = ({ title, value, icon: Icon, trend }) => (
      <div className="bg-white p-4 rounded-lg shadow-sm">
         <div className="flex justify-between items-start">
            <div>
               <p className="text-gray-600 text-sm">{title}</p>
               <h4 className="text-2xl font-semibold mt-1">{value}</h4>
            </div>
            <Icon className="text-gray-400" size={20} />
         </div>
         {trend && (
            <div className="mt-2 flex items-center text-sm">
               <TrendingUp size={16} className={trend > 0 ? "text-green-500" : "text-red-500"} />
               <span className={`ml-1 ${trend > 0 ? "text-green-500" : "text-red-500"}`}>{Math.abs(trend)}%</span>
            </div>
         )}
      </div>
   );

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <MetricCard title="Total Members" value={data.members} icon={Users} trend={5.2} />
         <MetricCard title="Active Teams" value={data.teams} icon={Users} trend={2.1} />
         <MetricCard title="Monthly Events" value={data.events} icon={Calendar} trend={-1.5} />
         <MetricCard title="Revenue Growth" value={`$${data.revenue}`} icon={BarChart2} trend={3.7} />
      </div>
   );
};

export default DashboardMetrics;
