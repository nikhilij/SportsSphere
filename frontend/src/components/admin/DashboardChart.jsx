import React from 'react';
import { Bar, Line, Doughnut, Pie, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
);

// Common chart options
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
    },
  },
};

// Color palette for charts
const colorPalette = {
  primary: 'rgba(59, 130, 246, 0.8)',
  primaryBorder: 'rgb(59, 130, 246)',
  secondary: 'rgba(16, 185, 129, 0.8)',
  secondaryBorder: 'rgb(16, 185, 129)',
  accent: 'rgba(245, 158, 11, 0.8)',
  accentBorder: 'rgb(245, 158, 11)',
  danger: 'rgba(239, 68, 68, 0.8)',
  dangerBorder: 'rgb(239, 68, 68)',
  info: 'rgba(99, 102, 241, 0.8)',
  infoBorder: 'rgb(99, 102, 241)',
};

export const BarChart = ({ 
  title, 
  data, 
  options = {}, 
  height = "h-64",
  showLegend = true,
  animated = true 
}) => {
  const chartOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...options.plugins,
      legend: {
        display: showLegend,
        position: 'top',
      },
    },
    animation: animated ? {
      duration: 1000,
      easing: 'easeInOutQuart',
    } : false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6B7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>
      <div className={height}>
        <Bar data={data} options={chartOptions} />
      </div>
    </div>
  );
};

export const LineChart = ({ 
  title, 
  data, 
  options = {}, 
  height = "h-64",
  showLegend = true,
  animated = true,
  tension = 0.4 
}) => {
  const chartData = {
    ...data,
    datasets: data.datasets?.map(dataset => ({
      ...dataset,
      tension: tension,
      borderWidth: 3,
      pointBackgroundColor: dataset.borderColor,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }))
  };

  const chartOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...options.plugins,
      legend: {
        display: showLegend,
        position: 'top',
      },
    },
    animation: animated ? {
      duration: 1500,
      easing: 'easeInOutQuart',
    } : false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6B7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      <div className={height}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export const DoughnutChart = ({ 
  title, 
  data, 
  options = {}, 
  height = "h-64",
  showLegend = true,
  animated = true,
  centerText = null 
}) => {
  const chartOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...options.plugins,
      legend: {
        display: showLegend,
        position: 'bottom',
      },
    },
    animation: animated ? {
      animateRotate: true,
      duration: 1500,
    } : false,
    cutout: '60%',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
      </div>
      <div className={`${height} flex justify-center items-center relative`}>
        <Doughnut data={data} options={chartOptions} />
        {centerText && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{centerText.value}</div>
              <div className="text-sm text-gray-500">{centerText.label}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const PieChart = ({ 
  title, 
  data, 
  options = {}, 
  height = "h-64",
  showLegend = true,
  animated = true 
}) => {
  const chartOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...options.plugins,
      legend: {
        display: showLegend,
        position: 'right',
      },
    },
    animation: animated ? {
      animateRotate: true,
      duration: 1500,
    } : false,
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
      </div>
      <div className={`${height} flex justify-center`}>
        <Pie data={data} options={chartOptions} />
      </div>
    </div>
  );
};

export const RadarChart = ({ 
  title, 
  data, 
  options = {}, 
  height = "h-64",
  showLegend = true,
  animated = true 
}) => {
  const chartOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...options.plugins,
      legend: {
        display: showLegend,
        position: 'top',
      },
    },
    animation: animated ? {
      duration: 1500,
    } : false,
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
        ticks: {
          color: '#6B7280',
          backdropColor: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
      </div>
      <div className={`${height} flex justify-center`}>
        <Radar data={data} options={chartOptions} />
      </div>
    </div>
  );
};

// Utility function to generate chart data
export const generateChartData = (labels, datasets, type = 'bar') => {
  const colors = [
    colorPalette.primary,
    colorPalette.secondary,
    colorPalette.accent,
    colorPalette.danger,
    colorPalette.info,
  ];
  
  const borderColors = [
    colorPalette.primaryBorder,
    colorPalette.secondaryBorder,
    colorPalette.accentBorder,
    colorPalette.dangerBorder,
    colorPalette.infoBorder,
  ];

  return {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: type === 'doughnut' || type === 'pie' 
        ? colors 
        : colors[index % colors.length],
      borderColor: type === 'doughnut' || type === 'pie' 
        ? borderColors 
        : borderColors[index % borderColors.length],
      borderWidth: type === 'line' ? 3 : 1,
    })),
  };
};

// Loading skeleton component
export const ChartSkeleton = ({ height = "h-64" }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
      </div>
      <div className={`${height} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="text-gray-400">Loading chart...</div>
      </div>
    </div>
  );
};

// Export color palette for external use
export { colorPalette };

export default {
  BarChart,
  LineChart,
  DoughnutChart,
  PieChart,
  RadarChart,
  generateChartData,
  ChartSkeleton,
  colorPalette,
};
