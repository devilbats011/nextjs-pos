export interface BillProps {
  id: string;
  item_id: string | null;
  item_quantity: number;
  order_id: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}
