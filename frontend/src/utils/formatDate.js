/**
 * Format a date into a readable string
 * @param {string|Date} date - The date to format
 * @param {object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const {
    format = 'full', // 'full', 'short', 'relative', 'time'
    includeTime = false,
    locale = 'en-US',
  } = options;

  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Handle invalid dates
  if (isNaN(dateObj.getTime())) return 'Invalid Date';

  // Format for relative time (e.g., "2 days ago")
  if (format === 'relative') {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const now = new Date();
    const diffInMs = dateObj.getTime() - now.getTime();
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.round(diffInMs / (1000 * 60));
    
    if (diffInDays === 0) {
      if (diffInHours === 0) {
        return rtf.format(diffInMinutes, 'minute');
      }
      return rtf.format(diffInHours, 'hour');
    }
    if (Math.abs(diffInDays) < 7) {
      return rtf.format(diffInDays, 'day');
    }
    if (Math.abs(diffInDays) < 30) {
      return rtf.format(Math.round(diffInDays / 7), 'week');
    }
    if (Math.abs(diffInDays) < 365) {
      return rtf.format(Math.round(diffInDays / 30), 'month');
    }
    return rtf.format(Math.round(diffInDays / 365), 'year');
  }

  // Format for date only or date with time
  let dateOptions = {};

  switch (format) {
    case 'full':
      dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      break;
    case 'short':
      dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      break;
    case 'time':
      return dateObj.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
      });
    default:
      dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
  }

  if (includeTime && format !== 'time') {
    dateOptions.hour = '2-digit';
    dateOptions.minute = '2-digit';
  }

  return dateObj.toLocaleDateString(locale, dateOptions);
};

/**
 * Format a date range (e.g., "May 1 - May 5, 2023")
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @param {object} options - Formatting options
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate, options = {}) => {
  if (!startDate || !endDate) return '';

  const startObj = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const endObj = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  // Handle invalid dates
  if (isNaN(startObj.getTime()) || isNaN(endObj.getTime())) {
    return 'Invalid Date Range';
  }

  const {
    format = 'short',
    includeTime = false,
    locale = 'en-US',
    separator = ' - ',
  } = options;

  // Same day check
  const sameDay = 
    startObj.getDate() === endObj.getDate() &&
    startObj.getMonth() === endObj.getMonth() &&
    startObj.getFullYear() === endObj.getFullYear();

  if (sameDay) {
    if (includeTime) {
      const dateStr = formatDate(startObj, { format, locale });
      const startTimeStr = formatDate(startObj, { format: 'time', locale });
      const endTimeStr = formatDate(endObj, { format: 'time', locale });
      return `${dateStr}, ${startTimeStr}${separator}${endTimeStr}`;
    }
    return formatDate(startObj, { format, locale });
  }

  // Same month and year check
  const sameMonthYear = 
    startObj.getMonth() === endObj.getMonth() &&
    startObj.getFullYear() === endObj.getFullYear();

  if (sameMonthYear) {
    const monthYearFormat = { month: 'long', year: 'numeric' };
    const monthYearStr = startObj.toLocaleDateString(locale, monthYearFormat);
    return `${startObj.getDate()} - ${endObj.getDate()} ${monthYearStr}`;
  }

  // Different months or years
  return `${formatDate(startObj, { format, locale })}${separator}${formatDate(endObj, { format, locale })}`;
};

export default {
  formatDate,
  formatDateRange,
};
