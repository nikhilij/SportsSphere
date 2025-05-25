import React from "react";
import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Users, Calendar, TrendingDown } from "react-feather";

const DashboardMetrics = ({ data }) => {
   const MetricCard = ({ title, value, icon: Icon, trend }) => {
      const isPositive = trend > 0;
      const isNegative = trend < 0;
      
      return (
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
         >
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                     <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                     <p className="text-sm font-medium text-gray-600">{title}</p>
                     <p className="text-2xl font-bold text-gray-900">{value}</p>
                  </div>
               </div>
               <div className="flex items-center space-x-1">
                  {isPositive && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {isNegative && <TrendingDown className="h-4 w-4 text-red-500" />}
                  <span
                     className={`text-sm font-medium ${
                        isPositive
                           ? "text-green-600"
                           : isNegative
                           ? "text-red-600"
                           : "text-gray-600"
                     }`}
                  >
                     {isPositive ? "+" : ""}{trend}%
                  </span>
               </div>
            </div>
         </motion.div>
      );
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <MetricCard 
            title="Total Members" 
            value={data?.members || 0} 
            icon={Users} 
            trend={5.2} 
         />
         <MetricCard 
            title="Active Teams" 
            value={data?.teams || 0} 
            icon={Users} 
            trend={2.1} 
         />
         <MetricCard 
            title="Monthly Events" 
            value={data?.events || 0} 
            icon={Calendar} 
            trend={-1.5} 
         />
         <MetricCard 
            title="Revenue Growth" 
            value={`$${data?.revenue || 0}`} 
            icon={BarChart2} 
            trend={3.7} 
         />
      </div>
   );
};

export default DashboardMetrics;
