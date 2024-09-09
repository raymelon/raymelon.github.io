import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  let currentDate = new Date().getTime();
  // if (!date.includes("T")) {
  //   date = `${date}T00:00:00`;
  // }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let targetDateRaw = new Date(date);
  let fullDate = `${targetDateRaw.getFullYear()}-${String(targetDateRaw.getMonth() + 1).padStart(2, '0')}-${String(targetDateRaw.getDate()).padStart(2, '0')} ${String(targetDateRaw.getHours()).padStart(2, '0')}:${String(targetDateRaw.getMinutes()).padStart(2, '0')}:${String(targetDateRaw.getSeconds()).padStart(2, '0')}`;

  let timeAgoString = "";
  if (daysAgo < 1) {
    let hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    if (hoursAgo < 1) {
      let minutesAgo = Math.floor(timeDifference / (1000 * 60));
      timeAgoString = minutesAgo === 0 ? "Just now" : `${minutesAgo}m ago`;
    } else {
      timeAgoString = `${hoursAgo}h ago`;
    }
  } else if (daysAgo < 7) {
    timeAgoString = `${daysAgo}d ago`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    timeAgoString = `${weeksAgo}w ago`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    timeAgoString = `${monthsAgo}mo ago`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    timeAgoString = `${yearsAgo}y ago`;
  }

  return `${timeAgoString} • ${fullDate}`;
}
