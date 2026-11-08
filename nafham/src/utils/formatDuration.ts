export function formatCourseDuration(durationInput: string | number | undefined | null): string {
  if (!durationInput) return "غير محدد";

  // If it already contains Arabic words like "ساعة" or "دقيقة", return as is
  const str = String(durationInput).trim();
  if (str.includes("ساعة") || str.includes("دقيقة") || str.includes("ساعات")) {
    return str;
  }

  // Parse the input
  let hours = 0;
  let minutes = 0;

  if (str.includes(":")) {
    // Format "HH:MM"
    const parts = str.split(":");
    hours = parseInt(parts[0]) || 0;
    minutes = parseInt(parts[1]) || 0;
  } else {
    // Assume it's a decimal number representing hours, e.g., "39", "4.5", "4.9"
    const num = parseFloat(str);
    if (!isNaN(num)) {
      hours = Math.floor(num);
      minutes = Math.round((num - hours) * 60);
    } else {
      return str; // Fallback
    }
  }

  const parts = [];

  // Arabic localization for hours
  if (hours > 0) {
    if (hours === 1) parts.push("ساعة واحدة");
    else if (hours === 2) parts.push("ساعتان");
    else if (hours >= 3 && hours <= 10) parts.push(`${hours} ساعات`);
    else parts.push(`${hours} ساعة`);
  }

  // Arabic localization for minutes
  if (minutes > 0) {
    if (minutes === 1) parts.push("دقيقة واحدة");
    else if (minutes === 2) parts.push("دقيقتان");
    else if (minutes >= 3 && minutes <= 10) parts.push(`${minutes} دقائق`);
    else parts.push(`${minutes} دقيقة`);
  }

  if (parts.length === 0) return "0 دقيقة";

  return parts.join(" و ");
}
