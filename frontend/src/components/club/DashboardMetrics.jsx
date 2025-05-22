import React from "react";
import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Users, Calendar } from "react-feather";

const DashboardMetrics = ({ data }) => {
   // ...existing MetricCard component...

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
