export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'main' | 'extra';
  standalone?: boolean;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface OrderDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryDate: string;
  deliveryTime: string;
}

export type OrderStatus = 'pending' | 'paid' | 'delivered';

export interface OrderRecord {
  id?: string;
  items: CartItem[];
  customer: OrderDetails;
  total: number;
  status: OrderStatus;
  createdAt: string;
  stripeSessionId?: string;
}
