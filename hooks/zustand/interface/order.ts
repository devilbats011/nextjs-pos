import { ItemProps } from "./item";


export type OrderStatus = 
| 'unpaid' 
| 'not_fully_paid' 
| 'fully_paid' 
| 'fully_refund' 
| 'mix';

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
