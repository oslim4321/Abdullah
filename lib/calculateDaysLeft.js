/**
 * Calculate the number of days left until a target date.
 *
 * @param {string} targetDateStr - The target date in the format "yyyy/mm/dd".
 * @returns {string} A string indicating the number of days left or days ago.
 */
function daysLeftUntilDate(targetDateStr) {
     if(!targetDateStr){return""}
    // Parse the target date in the format "yyyy/mm/dd"
    const targetDate = new Date(targetDateStr.replace(/-/g, '/'));
  
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = targetDate - currentDate;
  
    // Convert the time difference to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    // Check if the target date is in the future
    if (daysDifference < 0) {
      return `${-daysDifference} days ago`;
    } else if (daysDifference === 0) {
      return 'Today';
    } else {
      return `${daysDifference} days left`;
    }
  }
  
 export default daysLeftUntilDate
  