
export function formatPrice(value: string | number): string {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  return `RM ${numericValue.toFixed(2)}`;

}

export function getObjectFromArrayById<T extends { id: string }> (arr: T[], id: string): T | undefined {
  return arr.find(item => item.id === id);
}

export function uuid() : string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}