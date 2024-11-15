/* eslint-disable @typescript-eslint/no-explicit-any */

import { billStatus } from "@/hooks/helper/constant";
import { BillProps } from "./backend/bill";
import { BillRefundDetailProps } from "./backend/bill_refund_detail";

export interface ItemProps {
  id?: string;
  name: string;
  price: number | string;
  quantity: number;
  category_id?: string;
  status?: string | null;
  updated_at?: string;
  created_at?: string;
  representation_color?: string | null | undefined;
  representation_image?: any;
}
export interface GroupItemProps {
  id: string;
  name: string;
  price: number;
  itemPrice: number;
  quantity: number;
}

export interface itemsUseStoreProps {
  items: ItemProps[];
  getItems: () => Promise<any>;
  fetchItems: () => Promise<any>;
  addItem: (
    item: ItemProps,
    representation_mod: "color" | "image"
  ) => Promise<boolean>;
  editItem: (
    id: number | string,
    updatedItem: Partial<ItemProps>,
    representation_mod: "color" | "image"
  ) => Promise<boolean>;
  deleteItemById: (id: number | string) => Promise<boolean>;
  getItemById: (id: string) => Promise<ItemProps | null>;
}

export type OrderStatus =
  | "unpaid"
  | "not_fully_paid"
  | "fully_paid"
  | "fully_refund"
  | "mix";

export interface BillProp {
  id: string;
  item_id: string;
  order_id: string;
  item_quantity: number;
  status: billStatus | string;
  created_at: string;
  updated_at: string;
  refund_id: string | null;
  item: ItemProps;
  bill_refund_details?: BillRefundDetailProps[];
}

export interface OrderProp {
  id: string;
  short_id: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  bills: BillProp[];
}

export interface splitOrderItemsProps {
  id: string;
  name: string;
  quantity: number;
  price: number;
  sumPrice: number;
  bill_id: string;
}

export interface SplitOrderProps {
  splitOrderItems: splitOrderItemsProps[];
  totalSumPrice: number;
  id: string;
  isPaid: boolean;
  quantity_paid: number;
}

export interface SplitOrderStorage {
  itemStorage: GroupItemProps[];
  isEmpty: boolean;
}

export type SplitOrders = SplitOrderProps[];

export type bill_status_type = "unpaid" | "paid" | "refund" | "mix";

export interface refundBillResponse {
  bill: BillProps;
  bill_refund_details: BillRefundDetailProps[];
}

export interface OrdersStateInterface {
  orders: OrderProp[]; // Assuming `OrderProp` is an array of order items
  getOrders: () => Promise<OrderProp[]>;
  getOrdersByChunks: (
    chunks: number,
    number_of_item_per_chunk: number
  ) => Promise<OrderProp[] | null>;
  getOrderById: (id: string) => Promise<OrderProp | undefined>; // Returns a promise with a single order or undefined
  orderItems: any[];
  setOrderItems: any;
  getOrderItems: any;
  clearOrderItems: any;
  deleteOrderItem: any;
  groupedItemList: () => GroupItemProps[];
  getTotalOrderItemsPrice: () => any;
  incrementOrderItemQuantity: any;
  decrementOrderItemQuantity: (id: string) => ItemProps[];
  depositSplitOrderToStorageById?: any;
  withdrawSplitOrderFromStorageById?: any;
  refundBill: (
    bill: BillProp,
    quantity: number
  ) => Promise<refundBillResponse | null>;
  deleteGroupOrderItemsById: (id: string) => void;
  createOrder: (
    data: GroupItemProps[],
    bill_status?: bill_status_type
  ) => Promise<OrderProp>;
  createSplitBillOrder: any;
  isOrderItemsEmpty: () => boolean;
  totalQuantitySplitOrderPage: number;
  setTotalQuantitySplitOrderPage: (value: number) => any;
}
