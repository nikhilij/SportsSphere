import React, { useState } from 'react';
import { ChevronRightIcon, EyeIcon } from '@heroicons/react/24/outline';

const ActivityItem = ({ icon, title, description, time, isNew, priority = 'normal', onClick }) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-400 bg-red-50';
      case 'medium':
        return 'border-l-4 border-l-yellow-400 bg-yellow-50';
      case 'low':
        return 'border-l-4 border-l-green-400 bg-green-50';
      default:
        return isNew ? 'bg-blue-50 border-l-4 border-l-blue-400' : 'hover:bg-gray-50';
    }
  };

  const getIconStyles = () => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'low':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div 
      className={`
        relative p-4 border-b last:border-b-0 flex items-start gap-3 
        transition-all duration-200 cursor-pointer group
        ${getPriorityStyles()}
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {isNew && (
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            New
          </span>
        </div>
      )}
      
      <div className={`p-2 rounded-full ${getIconStyles()} flex-shrink-0 transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1 pr-8">
          <h4 className="font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
            {title}
          </h4>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
            {time}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
      
      <ChevronRightIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </div>
  );
};

const RecentActivity = ({ 
  activities = [], 
  title = "Recent Activity",
  maxHeight = "400px",
  showViewAll = true,
  onViewAll,
  onActivityClick,
  isLoading = false,
  error = null
}) => {
  const [filter, setFilter] = useState('all');

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'new') return activity.isNew;
    return activity.priority === filter;
  });

  const getFilterCount = (filterType) => {
    if (filterType === 'all') return activities.length;
    if (filterType === 'new') return activities.filter(a => a.isNew).length;
    return activities.filter(a => a.priority === filterType).length;
  };

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-red-200">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Activities</h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          {showViewAll && (
            <button 
              onClick={onViewAll}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-100 px-3 py-1 rounded-lg transition-all duration-200"
            >
              <EyeIcon className="w-4 h-4" />
              View All
            </button>
          )}
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'new', 'high', 'medium', 'low'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`
                px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 capitalize
                ${filter === filterType 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }
              `}
            >
              {filterType} ({getFilterCount(filterType)})
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div 
        className="overflow-y-auto"
        style={{ maxHeight }}
      >
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading activities...</p>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">📭</div>
            <h4 className="font-medium text-gray-600 mb-1">No activities found</h4>
            <p className="text-sm text-gray-500">
              {filter === 'all' ? 'No recent activities to display' : `No ${filter} activities found`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredActivities.map((activity, index) => (
              <ActivityItem 
                key={activity.id || index}
                icon={activity.icon}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                isNew={activity.isNew}
                priority={activity.priority}
                onClick={() => onActivityClick?.(activity)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredActivities.length > 0 && (
        <div className="bg-gray-50 px-4 py-2 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Showing {filteredActivities.length} of {activities.length} activities
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
