export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  flavor?: string; // e.g. "麻辣", "五香"
  spec?: string;   // e.g. "20斤/件"
  subUnit?: string; // e.g. "4袋"
}

export interface CartItem extends Product {
  quantity: number;
}

export type TabView = 'catalog' | 'cart';