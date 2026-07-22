import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { RolePermissionRepository } from '@/domain/repositories/role-permission.repository';
import { UpdateRolePermissionsCommand } from '@/application/use-cases/commands/permissions/update-role-permissions.command';
import { ApiResult } from '@/shared/types/api-result';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { updateRolePermissionsLogic } from '@/application/use-cases/logic/permissions/update-role-permissions.logic';


@RequestHandler(UpdateRolePermissionsCommand)
export class UpdateRolePermissionsHandler implements IRequestHandler<UpdateRolePermissionsCommand, ApiResult<void>> {
  constructor(
    private readonly rolePermissionRepository: RolePermissionRepository,
    private readonly messageBroker: MessageBroker
  ) {}

  async handle(command: UpdateRolePermissionsCommand): Promise<ApiResult<void>> {
      return await updateRolePermissionsLogic(this.rolePermissionRepository, command.dto);
  }
}
