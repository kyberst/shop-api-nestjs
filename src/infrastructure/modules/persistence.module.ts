import { Module, Global } from '@nestjs/common';
import { PersistenceService } from '@/infrastructure/persistence/persistence.service';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { allInfrastructureProviders, persistenceTokens } from '@/infrastructure/dependency-injection';

@Global()
@Module({
  providers: [
    PersistenceService,
    PrismaService,
    MongooseService,
    ...allInfrastructureProviders,
  ],
  exports: [
    PersistenceService,
    PrismaService,
    MongooseService,
    ...persistenceTokens,
  ],
})
export class PersistenceModule {}
