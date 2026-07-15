import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class MongooseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MongooseService.name);

  async onModuleInit() {
    const uri = process.env.MONGO_URI;
    
    // Disable Mongoose query/command buffering globally so that queries immediately
    // fail over to the fallback local cache rather than freezing the application.
    mongoose.set('bufferCommands', false);
    
    if (uri) {
      this.logger.log('Initiating non-blocking MongoDB connection...');
      try {
        mongoose.connect(uri, {
          serverSelectionTimeoutMS: 3000, // Fast connection timeout
          connectTimeoutMS: 3000,
        })
        .then(() => {
          this.logger.log('Connected to MongoDB via Mongoose (Read DB)');
        })
        .catch((err: unknown) => {
          const errorMessage = err instanceof Error ? err.message : String(err);
          this.logger.warn(`MongoDB is currently offline/not connected. Falling back to robust in-memory data store cache: ${errorMessage}`);
        });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        this.logger.error(`Mongoose connection initiation failed. Falling back to robust in-memory data store cache: ${errorMessage}`);
      }
    } else {
      this.logger.warn('MONGO_URI is not defined');
    }
  }

  isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  async onModuleDestroy() {
    await mongoose.disconnect();
  }
}
