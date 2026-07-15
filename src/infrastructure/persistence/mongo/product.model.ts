import { Schema, model, models } from 'mongoose';

export const ProductSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: String, required: true },
  category: { type: String, required: false },
  imageUrl: { type: String, required: false },
  rating: { type: Number, default: 5 },
  moq: { type: Number, default: 1 },
  supplierName: { type: String, default: 'Direct Supplier' },
  supplierCountry: { type: String, default: 'China' },
  isTradeAssurance: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
});

export const MongoProduct = models.Product || model('Product', ProductSchema);
