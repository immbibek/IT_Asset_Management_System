import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true,
  },
  assetName: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  estimatedCompletion: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['In Progress', 'Pending Parts', 'Completed'],
    default: 'In Progress',
  },
  cost: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Maintenance', maintenanceSchema);
