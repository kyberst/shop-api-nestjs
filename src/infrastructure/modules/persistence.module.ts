import { Module, Global } from '@nestjs/common';
import { PersistenceService } from '../persistence/persistence.service';
import { PrismaService } from '../persistence/prisma.service';
import { MongooseService } from '../persistence/mongoose.service';
import { allInfrastructureProviders, persistenceTokens } from '../dependency-injection';

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
