import { Schema, model, models } from 'mongoose';

export const CategorySchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

export const MongoCategory = models.Category || model('Category', CategorySchema);
