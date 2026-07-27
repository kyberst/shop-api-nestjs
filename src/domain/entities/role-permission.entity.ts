export class RolePermission {
  private _id: string;
  private _role: string;
  private _menuKey: string;
  private _canView: boolean;
  private _canEdit: boolean;
  private _canDelete: boolean;

  constructor(props: {
    id: string;
    role: string;
    menuKey: string;
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
  }) {
    this._id = props.id;
    this._role = props.role;
    this._menuKey = props.menuKey;
    this._canView = props.canView;
    this._canEdit = props.canEdit;
    this._canDelete = props.canDelete;

    this.validate();
  }

  private validate(): void {
    if (!this._id || this._id.trim() === '') {
      throw new Error('RolePermission ID is required');
    }
    if (!this._role || this._role.trim() === '') {
      throw new Error('Role is required');
    }
    if (!this._menuKey || this._menuKey.trim() === '') {
      throw new Error('Menu key is required');
    }
  }

  // Getters
  get id(): string { return this._id; }
  get role(): string { return this._role; }
  get menuKey(): string { return this._menuKey; }
  get canView(): boolean { return this._canView; }
  get canEdit(): boolean { return this._canEdit; }
  get canDelete(): boolean { return this._canDelete; }

  // Behavioral methods
  public updatePermissions(canView: boolean, canEdit: boolean, canDelete: boolean): void {
    this._canView = canView;
    this._canEdit = canEdit;
    this._canDelete = canDelete;
  }

  static create(props: {
    id: string;
    role: string;
    menuKey: string;
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
  }): RolePermission {
    return new RolePermission(props);
  }
}
