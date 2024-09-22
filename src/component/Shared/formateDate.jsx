export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Array of month abbreviations
    const months = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
  
    // Get the day, month, and year
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    // Return the formatted date string
    return `${day} ${month} ${year}`;
  };
  
  // Example usage:
  // const formattedDate = formatDate('2024-09-22 22:30');
