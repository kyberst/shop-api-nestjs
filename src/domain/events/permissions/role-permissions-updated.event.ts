export class RolePermissionsUpdatedEvent {
  constructor(
    public readonly role: string,
    public readonly permissions: {
      menuKey: string;
      canView: boolean;
      canEdit: boolean;
      canDelete: boolean;
    }[]
  ) {}
}
