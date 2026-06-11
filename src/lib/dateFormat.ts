/** Format YYYY-MM-DD for display (noon UTC avoids TZ shift). */
export function formatDateShort(value: string) {
  const d = new Date(value + "T12:00:00");
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateLong(value: string) {
  const d = new Date(value + "T12:00:00");
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatUseOfFundLabel(value: string) {
  return value
    .split("_")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}
