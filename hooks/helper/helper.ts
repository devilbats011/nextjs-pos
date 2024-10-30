
export function formatPrice(value: string | number): string {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  return `RM ${numericValue.toFixed(2)}`;

}
