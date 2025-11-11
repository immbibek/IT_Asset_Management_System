import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming employees are users
    required: true,
  },
  assignmentDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    required: false, // Can be null if not yet returned
  },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
