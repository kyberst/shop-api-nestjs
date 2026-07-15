import mongoose from 'mongoose';

const rolePermissionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  menuKey: { type: String, required: true },
  canView: { type: Boolean, required: true },
  canEdit: { type: Boolean, required: true },
  canDelete: { type: Boolean, required: true },
});

rolePermissionSchema.index({ role: 1, menuKey: 1 }, { unique: true });

export const MongoRolePermission = mongoose.models.RolePermission || mongoose.model('RolePermission', rolePermissionSchema);
