const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function getOrdinal(day) {
  if (day >= 11 && day <= 13) return day + "th";
  const last = day % 10;
  if (last === 1) return day + "st";
  if (last === 2) return day + "nd";
  if (last === 3) return day + "rd";
  return day + "th";
}

function formatDate(date) {
  return MONTHS[date.getMonth()] + " " + getOrdinal(date.getDate()) + " " + date.getFullYear();
}

module.exports = formatDate;