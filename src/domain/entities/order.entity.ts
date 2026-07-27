import { BaseEntity } from './base.entity';
import { OrderItem } from './order-item.entity';

export interface Order extends BaseEntity {
  customer: string;
  customerEmail: string;
  userId: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  items: OrderItem[];
}

export class OrderEntity implements Order {
  private _id: string;
  private _createdAt?: Date;
  private _updatedAt?: Date;
  private _customer: string;
  private _customerEmail: string;
  private _userId: string;
  private _date: string;
  private _total: number;
  private _status: 'Pending' | 'Shipped' | 'Delivered';
  private _items: OrderItem[];

  constructor(props: {
    id: string;
    customer: string;
    customerEmail: string;
    userId: string;
    date?: string;
    status?: 'Pending' | 'Shipped' | 'Delivered';
    items?: OrderItem[];
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = props.id;
    this._customer = props.customer;
    this._customerEmail = props.customerEmail;
    this._userId = props.userId;
    this._date = props.date ?? new Date().toISOString();
    this._status = props.status ?? 'Pending';
    this._items = props.items ?? [];
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._total = this.calculateTotal();

    this.validate();
  }

  private validate(): void {
    if (!this._id || this._id.trim() === '') {
      throw new Error('Order ID is required');
    }
    if (!this._customer || this._customer.trim() === '') {
      throw new Error('Customer name is required');
    }
    if (!this._customerEmail || !this._customerEmail.includes('@')) {
      throw new Error('Invalid customer email');
    }
    if (!this._userId || this._userId.trim() === '') {
      throw new Error('User ID is required');
    }
    if (this._total < 0) {
      throw new Error('Order total cannot be negative');
    }
    if (!['Pending', 'Shipped', 'Delivered'].includes(this._status)) {
      throw new Error(`Invalid order status: ${this._status}`);
    }
  }

  // Getters
  get id(): string { return this._id; }
  get createdAt(): Date | undefined { return this._createdAt; }
  get updatedAt(): Date | undefined { return this._updatedAt; }
  get customer(): string { return this._customer; }
  get customerEmail(): string { return this._customerEmail; }
  get userId(): string { return this._userId; }
  get date(): string { return this._date; }
  get total(): number { return this._total; }
  get status(): 'Pending' | 'Shipped' | 'Delivered' { return this._status; }
  get items(): OrderItem[] { return this._items; }

  // Recalculates total
  public calculateTotal(): number {
    return this._items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // Pure behavioral methods
  public changeStatus(newStatus: 'Pending' | 'Shipped' | 'Delivered'): void {
    if (this._status === 'Delivered' && newStatus !== 'Delivered') {
      throw new Error('Cannot change status of a delivered order');
    }
    this._status = newStatus;
    this._updatedAt = new Date();
  }

  public addItem(item: OrderItem): void {
    if (item.price < 0) {
      throw new Error('Item price cannot be negative');
    }
    if (item.quantity <= 0) {
      throw new Error('Item quantity must be greater than zero');
    }
    this._items.push(item);
    this._total = this.calculateTotal();
    this._updatedAt = new Date();
  }

  public removeItem(itemId: string): void {
    this._items = this._items.filter(item => item.id !== itemId);
    this._total = this.calculateTotal();
    this._updatedAt = new Date();
  }

  static create(data: Partial<Order>): OrderEntity {
    if (!data.id) {
      throw new Error('Order ID is required for creation');
    }
    if (!data.customer) {
      throw new Error('Customer name is required for creation');
    }
    if (!data.customerEmail) {
      throw new Error('Customer email is required for creation');
    }
    if (!data.userId) {
      throw new Error('User ID is required for creation');
    }

    return new OrderEntity({
      id: data.id,
      customer: data.customer,
      customerEmail: data.customerEmail,
      userId: data.userId,
      date: data.date,
      status: data.status,
      items: data.items,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
