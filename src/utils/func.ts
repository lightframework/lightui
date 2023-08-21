export function toLocaleDateTimeString(str?: string) {
  if (!str) return;

  return new Date(str).toLocaleString().replaceAll('/', '-');
}
