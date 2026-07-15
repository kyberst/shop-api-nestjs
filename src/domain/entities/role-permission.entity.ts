export class RolePermission {
  constructor(
    public readonly id: string,
    public readonly role: string,
    public readonly menuKey: string,
    public canView: boolean,
    public canEdit: boolean,
    public canDelete: boolean,
  ) {}

  public updatePermissions(canView: boolean, canEdit: boolean, canDelete: boolean) {
    this.canView = canView;
    this.canEdit = canEdit;
    this.canDelete = canDelete;
  }

  static create(props: {
    id: string;
    role: string;
    menuKey: string;
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
  }): RolePermission {
    return new RolePermission(
      props.id,
      props.role,
      props.menuKey,
      props.canView,
      props.canEdit,
      props.canDelete,
    );
  }
}
