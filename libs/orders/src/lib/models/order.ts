import { OrderItem } from './order-item';
import { User } from '@cannon-cloud/users';

export class Order {
  id!: string;
  orderItems!: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: string;
  totalPrice?: string;
  user!: User;
  dateOrdered?: string;
}
