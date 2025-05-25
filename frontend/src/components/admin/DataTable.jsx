import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Settings, X, Filter, MoreHorizontal } from 'lucide-react';

const DataTable = ({ data, columns, title, filterPlaceholder = "Search...", pageSize = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterValue, setFilterValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Sort function
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Request sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter function
  const filteredData = React.useMemo(() => {
    if (!filterValue) return sortedData;
    
    return sortedData.filter((item) => {
      return columns.some((column) => {
        if (!item[column.key]) return false;
        return String(item[column.key]).toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  }, [sortedData, filterValue, columns]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column.key) {
      return <span className="text-gray-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">⇅</span>;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ChevronUp size={14} className="inline ml-2 text-blue-600" /> 
      : <ChevronDown size={14} className="inline ml-2 text-blue-600" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {filteredData.length} {filteredData.length === 1 ? 'entry' : 'entries'} found
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                ${showFilters 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        {showFilters && (
          <div className="mt-4 animate-in slide-in-from-top duration-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder={filterPlaceholder}
                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm placeholder-gray-400 shadow-sm"
              />
              {filterValue && (
                <button 
                  onClick={() => setFilterValue('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  scope="col" 
                  className={`
                    group px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider 
                    ${column.sortable !== false ? 'cursor-pointer hover:bg-gray-100/70 transition-colors' : ''}
                  `}
                  onClick={() => column.sortable !== false && requestSort(column.key)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.label}</span>
                    {column.sortable !== false && <SortIcon column={column} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-blue-50/30 transition-colors duration-150 group"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center">
                        {column.render ? column.render(row) : (
                          <span className="truncate max-w-xs" title={row[column.key]}>
                            {row[column.key]}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No data found</h3>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-gray-50/50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * pageSize + 1}</span> to{' '}
              <span className="font-semibold text-gray-900">
                {Math.min(currentPage * pageSize, filteredData.length)}
              </span>{' '}
              of <span className="font-semibold text-gray-900">{filteredData.length}</span> results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                  : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                }
              `}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`
                      w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200
                      ${currentPage === pageNum
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                  : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                }
              `}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
