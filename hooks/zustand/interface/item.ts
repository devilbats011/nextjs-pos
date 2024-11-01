// export interface ItemProps {
//   id?: any;
//   name?: any;
//   price?: any;
//   quantity?: any;
//   id_category?: any;
//   status?: any;
//   created_at?: any;
//   updated_at?: any;
//   representation?: undefined|null|string;
// }

export interface ItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  id_category: string;
  status: string | null;
  updated_at: string;
  created_at: string;
  representation: string | null|undefined;
}
export interface GroupItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  itemPrice: number;
}

export interface itemsUseStoreProps {
  items: ItemProps[];
  getItems: () => Promise<any>;
  fetchItems: () => Promise<any>;
  addItem: (item: ItemProps) => Promise<void>;
  editItem: (
    id: number | string,
    updatedItem: Partial<ItemProps>
  ) => Promise<void>;
  deleteItem: (id: number | string) => Promise<void>;
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
  status: string;
  created_at: string;
  updated_at: string;
  item: ItemProps;
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
}

export interface SplitOrderProps {
  splitOrderItems: splitOrderItemsProps[];
  totalSumPrice: number;
  id: string;
}

export interface SplitOrderStorage {
  itemStorage: GroupItemProps[];
  isEmpty: boolean;
}

export type SplitOrders = SplitOrderProps[];

export interface OrdersStateInterface {
  orders: OrderProp[]; // Assuming `OrderProp` is an array of order items
  getOrders: () => Promise<OrderProp[]>; // Returns a promise with an array of orders
  fetchOrder: (orderId?: string) => Promise<OrderProp | undefined>; // Returns a promise with a single order or undefined
  orderItems: any[];
  setOrderItems: any;
  getOrderItems: any;
  clearOrderItems: any;
  deleteOrderItem: any;
  groupedItemList: any;
  getTotalOrderItemsPrice: () => any;
  incrementOrderItemQuantity: any;
  decrementOrderItemQuantity: any;
  depositSplitOrderToStorageById?: any;
  withdrawSplitOrderFromStorageById?: any;
}
