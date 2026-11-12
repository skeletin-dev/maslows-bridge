/** Parse YYYY-MM-DD at noon so the local timezone can't shift it to the previous day. */
function parseDate(value: string) {
  const d = new Date(value + "T12:00:00");
  return Number.isNaN(d.getTime()) ? null : d;
}

type DateStyle = "short" | "long";

/** Format a project date; with "month" precision only the month and year are shown. */
export function formatProjectDate(
  value: string,
  precision: DatePrecision = "day",
  style: DateStyle = "long",
) {
  const d = parseDate(value);
  if (!d) return value;
  return d.toLocaleDateString("en-US", {
    month: style,
    ...(precision === "day" ? { day: "numeric" } : {}),
    year: "numeric",
  });
}

export function formatDateShort(value: string) {
  return formatProjectDate(value, "day", "short");
}

export function formatDateLong(value: string) {
  return formatProjectDate(value, "day", "long");
}

/** "Nov 2025 – Dec 10, 2025", or "… – Present" when there is no end date. */
export function formatProjectTimeline(
  project: Pick<Project, "start_date" | "start_date_precision" | "end_date">,
  style: DateStyle = "long",
) {
  const start = formatProjectDate(project.start_date, project.start_date_precision, style);
  const end = project.end_date ? formatProjectDate(project.end_date, "day", style) : "Present";
  return `${start} – ${end}`;
}

export function formatUseOfFundLabel(value: string) {
  return value
    .split("_")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}
