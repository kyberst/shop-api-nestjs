import { Injectable, Logger } from '@nestjs/common';
import { KafkaConsumerService } from '../../kafka.consumer.service';
import { MongoRolePermission } from '@/infrastructure/persistence/mongo/role-permission.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RolePermissionsUpdatedConsumer {
  private readonly logger = new Logger(RolePermissionsUpdatedConsumer.name);

  constructor(private readonly consumerService: KafkaConsumerService) {}

  async onModuleInit() {
    this.consumerService.registerConsumer({
      groupId: 'permissions-sync-group',
      topics: ['role-permissions.updated'],
      handle: async (topic: string, value: any) => {
        const { role, permissions } = value;
        this.logger.log(`Syncing permissions for role: ${role}`);
        
        for (const p of permissions) {
          await MongoRolePermission.updateOne(
            { role, menuKey: p.menuKey },
            { 
              $set: { 
                canView: p.canView, 
                canEdit: p.canEdit, 
                canDelete: p.canDelete 
              },
              $setOnInsert: { id: uuidv4() }
            },
            { upsert: true }
          );
        }
      },
    });
  }
}
