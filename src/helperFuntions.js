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

