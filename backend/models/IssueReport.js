import mongoose from 'mongoose';

const issueReportSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
    },
    reportingEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    issueType: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High', 'Critical'],
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
      default: 'Open',
    },
    reportedDate: {
      type: Date,
      default: Date.now,
    },
    resolvedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const IssueReport = mongoose.model('IssueReport', issueReportSchema);

export default IssueReport;
