const posts = require("../models/posts");

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// "23-01-2013" -> Date object
function parseDate(text) {
  const parts = text.split("-");
  const day = Number(parts[0]);
  const month = Number(parts[1]) - 1; // months start from 0 in JavaScript
  const year = Number(parts[2]);
  return new Date(year, month, day);
}

// 1 -> "1st", 2 -> "2nd", 3 -> "3rd", 15 -> "15th"
function getOrdinal(day) {
  if (day >= 11 && day <= 13) return day + "th";
  const last = day % 10;
  if (last === 1) return day + "st";
  if (last === 2) return day + "nd";
  if (last === 3) return day + "rd";
  return day + "th";
}

// Date object -> "January 15th 2013"
function formatDate(date) {
  return MONTHS[date.getMonth()] + " " + getOrdinal(date.getDate()) + " " + date.getFullYear();
}

function showTimeline(req, res) {
  // slice() makes a copy, so the original list stays unchanged
  const sorted = posts.slice().sort(function (a, b) {
    return parseDate(b.createdAt) - parseDate(a.createdAt);
  });

  const postsToShow = [];
  for (let i = 0; i < sorted.length; i++) {
    postsToShow.push({
      name: sorted[i].name,
      date: formatDate(parseDate(sorted[i].createdAt)),
      message: sorted[i].message
    });
  }

  res.render("timeline", { posts: postsToShow });
}

module.exports = { showTimeline };