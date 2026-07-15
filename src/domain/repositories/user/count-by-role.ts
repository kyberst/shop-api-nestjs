export interface ICountUsersByRoleRepository {
  countByRole(role: 'admin' | 'sales' | 'user'): Promise<number>;
}
