import { getCookie } from "cookies-next";
import { headers } from "next/headers";
import { auth_token_name } from "./constant";

/**
 * Formats a given number or numeric string as a price in Malaysian Ringgit (RM) with two decimal places.
 *
 * @param {string | number} value - The value to format. Can be a number or a string that represents a number.
 * @returns {string} The formatted price string prefixed with "RM" and rounded to two decimal places.
 *
 * @example
 * // Using a number
 * formatPrice(12.5); // Returns: "RM 12.50"
 *
 * // Using a string
 * formatPrice("45.678"); // Returns: "RM 45.68"
 *
 * // Edge case with an integer string
 * formatPrice("100"); // Returns: "RM 100.00"
 */
export function formatPrice(value: string | number): string {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  return `RM ${numericValue.toFixed(2)}`;
}

export function getObjectFromArrayById<T extends { id: string }>(
  arr: T[],
  id: string
): T | undefined {
  return arr.find((item) => item.id === id);
}

export function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Updates an object in an array based on a specified key-value pair.
 *
 * @template T - The type of objects in the array.
 * @param {Object} params - The parameters for the function.
 * @param {T[]} params.array - The array of objects to update.
 * @param {Record<string, any>} params.identifier - An object with a key-value pair to identify the object to update. E.g., `{ id: 2 }`.
 * @param {Partial<T>} params.updates - The properties to update on the matched object.
 * @returns {T[]} A new array with the updated object, if a match is found; otherwise, the array remains unchanged.
 *
 * @example
 * // Define the type of objects in the array
 * interface Item {
 *   id: number;
 *   name: string;
 *   quantity: number;
 *   price: number;
 * }
 *
 * const items: Item[] = [
 *   { id: 1, name: "Apple", quantity: 5, price: 1 },
 *   { id: 2, name: "Banana", quantity: 2, price: 0.5 },
 *   { id: 3, name: "Cherry", quantity: 10, price: 0.2 },
 * ];
 *
 * // Update the item with id 2
 * const updatedItems = updateObjectInArray({
 *   array: items,
 *   identifier: { id: 2 },
 *   updates: { quantity: 3, price: 0.6 },
 * });
 *
 * console.log(updatedItems);
 * // Output:
 * // [
 * //   { id: 1, name: "Apple", quantity: 5, price: 1 },
 * //   { id: 2, name: "Banana", quantity: 3, price: 0.6 }, // Updated item
 * //   { id: 3, name: "Cherry", quantity: 10, price: 0.2 },
 * // ]
 */
export function updateObjectArray<T>({
  array,
  identifier,
  updates,
}: {
  array: T[];
  identifier: Record<string, any>;
  updates: Partial<T>;
}): T[] {
  const [key, value] = Object.entries(identifier)[0]; // Extract key and value from identifier

  return array.map((item) =>
    item[key as keyof T] === value ? { ...item, ...updates } : item
  );
}

/**
 * Updates an object in an array using its unique identifier.
 *
 * @template T - The type of objects in the array.
 * @param {T[]} array - The array containing objects to be updated.
 * @param {string} id - The unique identifier of the object to update.
 * @param {Partial<T>} updates - The properties to update on the matched object.
 * @returns {T[]} A new array with the updated object, if a match is found; otherwise, the array remains unchanged.
 *
 * @example
 * // Define the type of objects in the array
 * interface Item {
 *   id: string;
 *   name: string;
 *   quantity: number;
 *   price: number;
 * }
 *
 * const items: Item[] = [
 *   { id: "1", name: "Apple", quantity: 5, price: 1 },
 *   { id: "2", name: "Banana", quantity: 2, price: 0.5 },
 *   { id: "3", name: "Cherry", quantity: 10, price: 0.2 },
 * ];
 *
 * // Update the item with id "2"
 * const updatedItems = updateObjectArrayById(items, "2", { quantity: 3, price: 0.6 });
 *
 * console.log(updatedItems);
 * // Output:
 * // [
 * //   { id: "1", name: "Apple", quantity: 5, price: 1 },
 * //   { id: "2", name: "Banana", quantity: 3, price: 0.6 }, // Updated item
 * //   { id: "3", name: "Cherry", quantity: 10, price: 0.2 },
 * // ]
 */
export function updateObjectArrayById<T>(
  array: T[],
  id: string,
  updates: Partial<T>
): T[] {
  return updateObjectArray({
    array,
    identifier: { id },
    updates,
  });
}

/**
 * Checks if an array is empty.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to check.
 * @returns {boolean} `true` if the array is not empty; otherwise, `false`.
 *
 * @example
 * // Returns true because the array is not empty
 * isArrayNotEmpty([1, 2, 3]);
 *
 * // Returns false because the array is empty
 * isArrayNotEmpty([]);
 */
export function isArrayNotEmpty<T>(arr: T[] | undefined): boolean {
  if(!arr) return false;
  return Array.isArray(arr) && arr.length > 0 ? true : false;
}

/**
 * Checks if an array is empty.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to check.
 * @returns {boolean} `true` if the array is empty; otherwise, `false`.
 *
 * @example
 * // Returns true because the array is empty
 * isArrayEmpty([]);
 *
 * // Returns false because the array is not empty
 * isArrayEmpty([1, 2, 3]);
 */
export function isArrayEmpty<T>(arr: T[] | undefined): boolean {
  if(!arr) return true;
  return Array.isArray(arr) && arr.length === 0;
}

export async function fetchWithAuth(
  url: string,
  options: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?: any;
    body?: any;
  } = {
    method: "GET",
    headers: {},
    body: null,
  }
) {
  // Get the token from cookies
  const token = getCookie(auth_token_name);

  options.headers = {
    ...options.headers,
    Accept: "*/*",
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response;
}


/**
 * Parses a date string and returns a formatted date or time string.
 *
 * @param {string} _date - The date string to be parsed.
 * @param {'date' | 'time'} [format_mod='date'] - The format modifier, either 'date' or 'time'.
 *   If 'date', returns the formatted date string as "Sat 19 Oct 2024".
 *   If 'time', returns the formatted time string as "HH:MM:SS".
 * 
 * @returns {string} The formatted date or time string. Returns '-' if the input date is undefined.
 * 
 * @example
 * parseDate('2024-10-19T12:34:56', 'date'); // Returns "Sat 19 Oct 2024"
 * parseDate('2024-10-19T12:34:56', 'time'); // Returns "12:34:56"
 */
export function parseDate( _date: string, format_mod: 'date'| 'time'="date") {
  if(!_date) {
    console.warn('undefined date', _date);
    return '-';
  }

  const date = new Date(_date);

  // Format as "Sat 19 Oct 2024"
  const formattedDate = date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Format as "HH:MM:SS"
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return format_mod  == 'date' ? formattedDate : formattedTime; 

}

/**
 * Parses a given string as an integer, or returns null if the input is not a string.
 *
 * @param {string | null | undefined} value - The value to parse.
 * @returns {number | null} The parsed integer, or null if the input is not a string.
 */
export function parseIntOrNull(value: any): number | null {
  if (typeof value !== 'string') return null;
  const result = parseInt(value);
  return result;
}
