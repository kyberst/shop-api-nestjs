import { Schema, model, models } from 'mongoose';
import { OrderItemSchema } from './order-item.schema';

export const OrderSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: false },
  customer: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [OrderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  date: { type: String, default: () => new Date().toISOString() },
});

export const MongoOrder = models.Order || model('Order', OrderSchema);
