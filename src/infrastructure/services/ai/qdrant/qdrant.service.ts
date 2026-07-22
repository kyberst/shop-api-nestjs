import { Injectable, OnModuleInit } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';
import { GoogleGenAI } from '@google/genai';
import { IVectorDatabaseService } from '@/application/interfaces/ai/vector-database.interface';

@Injectable()
export class QdrantService implements OnModuleInit, IVectorDatabaseService {
  private client!: QdrantClient;
  private aiClient!: GoogleGenAI;
  private readonly collectionName = 'products';

  async onModuleInit() {
    const url = process.env.QDRANT_URL;
    const apiKey = process.env.QDRANT_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!url || !apiKey) {
      console.warn('Qdrant URL or API Key missing in environment variables.');
      return;
    }

    this.client = new QdrantClient({ url, apiKey });
    if (geminiKey) {
      this.aiClient = new GoogleGenAI({ apiKey: geminiKey });
    }

    try {
      const collections = await this.client.getCollections();
      const exists = collections.collections.some(c => c.name === this.collectionName);
      if (!exists) {
        await this.client.createCollection(this.collectionName, {
          vectors: {
            size: 768,
            distance: 'Cosine',
          },
        });
      }
    } catch (e) {
      console.warn('Qdrant collection check failed (maybe read-only or network issue):', e);
    }
  }

  private async getEmbedding(text: string): Promise<number[]> {
    if (!this.aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API Key is not configured for embeddings.');
      }
      this.aiClient = new GoogleGenAI({ apiKey });
    }
    const response = await this.aiClient.models.embedContent({
      model: 'text-embedding-004',
      contents: text,
    });
    if (!response.embeddings || response.embeddings.length === 0 || !response.embeddings[0].values) {
      throw new Error('Failed to generate embedding values.');
    }
    return response.embeddings[0].values;
  }

  async search(query: string, limit = 5): Promise<any[]> {
    try {
      const vector = await this.getEmbedding(query);
      const results = await this.client.search(this.collectionName, {
        vector,
        limit,
        with_payload: true,
      });
      return results.map(r => r.payload);
    } catch (e) {
      console.error('Qdrant search error, falling back to empty:', e);
      return [];
    }
  }

  async upsertProduct(product: { id: string; name: string; description: string; price: number }) {
    try {
      const text = `Product: ${product.name}. Price: $${product.price}. Description: ${product.description}`;
      const vector = await this.getEmbedding(text);
      await this.client.upsert(this.collectionName, {
        wait: true,
        points: [
          {
            id: product.id,
            vector,
            payload: product,
          },
        ],
      });
    } catch (e) {
      console.error('Qdrant upsert product error:', e);
    }
  }
}
