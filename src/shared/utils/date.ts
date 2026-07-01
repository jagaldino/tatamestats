export function createLocalDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDateBR(dateISO: string): string {
  if (!dateISO) return "";

  if (dateISO.includes("-")) {
    const [year, month, day] = dateISO.split("-");
    return `${day}/${month}/${year}`;
  }

  const parsed = new Date(dateISO);
  const day = String(parsed.getDate()).padStart(2, "0");
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const year = parsed.getFullYear();

  return `${day}/${month}/${year}`;
}
