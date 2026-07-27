import { BaseEntity } from './base.entity';

export class Product implements BaseEntity {
  private _id: string;
  private _createdAt?: Date;
  private _updatedAt?: Date;
  private _createdBy?: string;
  private _updatedBy?: string;
  private _name: string;
  private _description: string;
  private _price: number;
  private _category: string;
  private _imageUrl: string;
  private _rating: number;
  private _moq: number;
  private _supplierName: string;
  private _supplierCountry: string;
  private _isTradeAssurance: boolean;
  private _isVerified: boolean;
  private _isActive: boolean;

  constructor(props: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    rating?: number;
    moq?: number;
    supplierName?: string;
    supplierCountry?: string;
    isTradeAssurance?: boolean;
    isVerified?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
  }) {
    this._id = props.id;
    this._name = props.name;
    this._description = props.description;
    this._price = props.price;
    this._category = props.category;
    this._imageUrl = props.imageUrl;
    this._rating = props.rating ?? 5;
    this._moq = props.moq ?? 1;
    this._supplierName = props.supplierName ?? 'Direct Supplier';
    this._supplierCountry = props.supplierCountry ?? 'China';
    this._isTradeAssurance = props.isTradeAssurance ?? true;
    this._isVerified = props.isVerified ?? true;
    this._isActive = props.isActive ?? true;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._createdBy = props.createdBy;
    this._updatedBy = props.updatedBy;

    this.validate();
  }

  private validate(): void {
    if (!this._id || this._id.trim() === '') {
      throw new Error('Product ID is required');
    }
    if (!this._name || this._name.trim() === '') {
      throw new Error('Product name is required');
    }
    if (this._price < 0) {
      throw new Error('Product price cannot be negative');
    }
    if (this._moq < 1) {
      throw new Error('Minimum Order Quantity (MOQ) must be at least 1');
    }
    if (this._rating < 0 || this._rating > 5) {
      throw new Error('Rating must be between 0 and 5');
    }
  }

  // Getters
  get id(): string { return this._id; }
  get createdAt(): Date | undefined { return this._createdAt; }
  get updatedAt(): Date | undefined { return this._updatedAt; }
  get createdBy(): string | undefined { return this._createdBy; }
  get updatedBy(): string | undefined { return this._updatedBy; }
  get name(): string { return this._name; }
  get description(): string { return this._description; }
  get price(): number { return this._price; }
  get category(): string { return this._category; }
  get imageUrl(): string { return this._imageUrl; }
  get rating(): number { return this._rating; }
  get moq(): number { return this._moq; }
  get supplierName(): string { return this._supplierName; }
  get supplierCountry(): string { return this._supplierCountry; }
  get isTradeAssurance(): boolean { return this._isTradeAssurance; }
  get isVerified(): boolean { return this._isVerified; }
  get isActive(): boolean | undefined { return this._isActive; }

  // Behavioral methods
  public applyDiscount(discountPercentage: number): void {
    if (discountPercentage < 0 || discountPercentage > 100) {
      throw new Error('Discount percentage must be between 0 and 100');
    }
    const discountAmount = this._price * (discountPercentage / 100);
    const newPrice = this._price - discountAmount;
    if (newPrice < 0) {
      throw new Error('Resulting price cannot be negative');
    }
    this._price = newPrice;
    this._updatedAt = new Date();
  }

  public changePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new Error('Price cannot be negative');
    }
    this._price = newPrice;
    this._updatedAt = new Date();
  }

  public activate(): void {
    this._isActive = true;
    this._updatedAt = new Date();
  }

  public deactivate(): void {
    this._isActive = false;
    this._updatedAt = new Date();
  }

  static create(data: Partial<Product>): Product {
    if (!data.id) {
      throw new Error('Product ID is required for creation');
    }
    if (!data.name) {
      throw new Error('Product name is required for creation');
    }
    if (data.price === undefined) {
      throw new Error('Product price is required for creation');
    }

    return new Product({
      id: data.id,
      name: data.name,
      description: data.description ?? '',
      price: data.price,
      category: data.category ?? 'General',
      imageUrl: data.imageUrl ?? '',
      rating: data.rating,
      moq: data.moq,
      supplierName: data.supplierName,
      supplierCountry: data.supplierCountry,
      isTradeAssurance: data.isTradeAssurance,
      isVerified: data.isVerified,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    });
  }
}
