const API_URL = "http://127.0.0.1:8000/api";

export const API_IMG = "http://127.0.0.1:8000/storage";

export default API_URL;

export const baseUrlOrders = API_URL + "/orders";

export const baseUrlCategory = API_URL + "/category";

export const auth_token_name = "auth_token";


export type billStatus = 'unpaid' | 'paid' | 'refund' | 'mix';

export const billStatusColors: Record<billStatus, string> = {
    'unpaid': 'text-orange-500', // Orange for unpaid bills
    'paid': 'text-green-500', // Green for paid bills
    'refund': 'text-blue-500', // Blue for refunded bills
    'mix': 'text-yellow-500', // Yellow for mixed status bills
  };
