export interface ItemProps {
  id: string;
  category_id: string;
  name: string;
  price: string;
  quantity: string;
  representation_color: string;
  representation_image: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}
