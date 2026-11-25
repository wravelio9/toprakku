export function formatPrice(value: number) {
  return `Rp${new Intl.NumberFormat("id-ID").format(value)}`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
