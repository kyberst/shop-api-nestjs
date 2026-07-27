import { BaseEntity } from './base.entity';

export class Category implements BaseEntity {
  private _id: string;
  private _createdAt?: Date;
  private _updatedAt?: Date;
  private _name: string;
  private _isActive?: boolean;

  constructor(props: {
    id: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = props.id;
    this._name = props.name;
    this._isActive = props.isActive ?? true;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    
    this.validate();
  }

  private validate(): void {
    if (!this._id || this._id.trim() === '') {
      throw new Error('Category ID is required');
    }
    if (!this._name || this._name.trim() === '') {
      throw new Error('Category name is required');
    }
    if (this._name.toLowerCase() === 'restricted') {
      throw new Error('Cannot create "Restricted" category');
    }
  }

  get id(): string { return this._id; }
  get name(): string { return this._name; }
  get isActive(): boolean | undefined { return this._isActive; }
  get createdAt(): Date | undefined { return this._createdAt; }
  get updatedAt(): Date | undefined { return this._updatedAt; }

  public rename(newName: string): void {
    if (!newName || newName.trim() === '') {
      throw new Error('Category name cannot be empty');
    }
    if (newName.toLowerCase() === 'restricted') {
      throw new Error('Cannot rename to "Restricted"');
    }
    this._name = newName;
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

  static create(data: Partial<Category>): Category {
    if (!data.id) {
      throw new Error('Category ID is required for creation');
    }
    if (!data.name) {
      throw new Error('Category name is required for creation');
    }
    return new Category({
      id: data.id,
      name: data.name,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
