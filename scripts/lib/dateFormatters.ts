export function deriveUpdateStrings(date: string) {
  // Append T12:00:00 to avoid UTC midnight → Pacific-time previous-day rollback
  const d = new Date(date + "T12:00:00");

  const enTitle = `Weekly Update for ${d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;

  const esTitle = `Actualización Semanal para el ${d.toLocaleDateString("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;

  const slug = `data-and-updates/weekly-updates/${date}`;

  return { enTitle, esTitle, slug };
}
