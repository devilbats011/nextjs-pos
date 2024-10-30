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
