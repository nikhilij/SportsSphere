import React from 'react';

const ActivityItem = ({ icon, title, description, time, isNew }) => (
  <div className={`p-3 ${isNew ? 'bg-blue-50' : ''} border-b last:border-b-0 flex items-start gap-3`}>
    <div className="p-2 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
      </div>
      <div className="max-h-[320px] overflow-y-auto">
        {activities.map((activity, index) => (
          <ActivityItem 
            key={index}
            icon={activity.icon}
            title={activity.title}
            description={activity.description}
            time={activity.time}
            isNew={activity.isNew}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
