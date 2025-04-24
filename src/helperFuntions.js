import { toast } from "react-toastify";

export function getTimeAgo(isoDateString) {
  try {
    const past = new Date(isoDateString);
    const now = new Date();

    if (isNaN(past.getTime())) {
      toast.error("Invalid date format");
      return "Invalid date";
    }

    const diffMs = now - past;
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);

    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;

    return past.toLocaleDateString();
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong parsing the date");
    return "Error";
  }
}



export function formatDate(isoDate) {
  try {
    const date = new Date(isoDate);
    if (isNaN(date)) {
      toast.error("Invalid date format");
    }

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  } catch (error) {
    toast.error("Failed to format date.");
    console.error("Date formatting error:", error);
    return "Invalid Date";
  }
}


export function getRelativeTime(isoDate) {
  try {
    const past = new Date(isoDate);
    if (isNaN(past)) {
      toast.error("Invalid date format");
      return "Invalid Date";
    }

    const now = new Date();
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    if (days === 1) return "yesterday";
    if (days === 2) return "2 days ago";
    if (days < 7) return `${days} days ago`;
    if (weeks === 1) return "1 week ago";
    if (weeks < 5) return `${weeks} weeks ago`;
    if (months === 1) return "1 month ago";
    if (months < 12) return `${months} months ago`;
    if (years === 1) return "1 year ago";
    return `${years} years ago`;

  } catch (error) {
    toast.error("Failed to format relative time.");
    console.error("Relative time formatting error:", error);
    return "Invalid Date";
  }
}


export function formatTimeFromISO(isoDate, use24Hour = false) {
  try {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) {
      toast.error("Invalid date format");
      return "Invalid Time";
    }

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    if (use24Hour) {
      return `${hours.toString().padStart(2, "0")}:${minutes}`;
    } else {
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes}`;
    }
  } catch (error) {
    toast.error("Failed to format time.");
    console.error("Time formatting error:", error);
    return "Invalid Time";
  }
}


function getFormattedDate() {
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return today.toLocaleDateString("en-US", options);
}

