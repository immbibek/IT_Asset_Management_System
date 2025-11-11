import Assignment from '../models/Assignment.js';
import Asset from '../models/Asset.js';
import { userModel as User } from '../models/User.js'; // Assuming User model is used for employees

// Assign an asset to an employee
export const assignAsset = async (req, res) => {
  const { asset, employee, assignmentDate } = req.body; // Changed from assetId, employeeId

  try {
    const foundAsset = await Asset.findById(asset); // Use 'asset'
    if (!foundAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    const foundEmployee = await User.findById(employee); // Use 'employee'
    if (!foundEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Check if the asset is already assigned and not returned
    const existingAssignment = await Assignment.findOne({ asset: asset, returnDate: null }); // Use 'asset'
    if (existingAssignment) {
      return res.status(400).json({ message: 'Asset is already assigned' });
    }

    const newAssignment = new Assignment({
      asset: asset,
      employee: employee,
      assignmentDate: assignmentDate || Date.now(),
    });

    await newAssignment.save();

    // Update asset status to 'Assigned'
    foundAsset.status = 'Assigned'; // Use foundAsset
    await foundAsset.save();

    // Populate the new assignment to return full details to the frontend
    const populatedAssignment = await newAssignment.populate('asset', 'assetName serialNumber status')
                                                  .populate('employee', 'name department');

    res.status(201).json(populatedAssignment); // Return populated assignment
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unassign an asset
export const unassignAsset = async (req, res) => {
  const { id } = req.params; // Assignment ID
  const { returnDate } = req.body;

  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (assignment.returnDate) {
      return res.status(400).json({ message: 'Asset is already unassigned' });
    }

    assignment.returnDate = returnDate || Date.now();
    await assignment.save();

    // Update asset status to 'Available'
    const asset = await Asset.findById(assignment.asset);
    if (asset) {
      asset.status = 'Available';
      await asset.save();
    }

    // Populate the updated assignment to return full details to the frontend
    const populatedAssignment = await assignment.populate('asset', 'assetName serialNumber status')
                                                .populate('employee', 'name department');

    res.status(200).json(populatedAssignment); // Return populated assignment
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all assignments
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('asset', 'assetName serialNumber status') // Changed 'name' to 'assetName'
      .populate('employee', 'name department');
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get assignments for a specific employee
export const getEmployeeAssignments = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const assignments = await Assignment.find({ employee: employeeId })
      .populate('asset', 'assetName serialNumber status') // Changed 'name' to 'assetName'
      .populate('employee', 'name department');
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get assignments for a specific asset
export const getAssetAssignments = async (req, res) => {
  const { assetId } = req.params;
  try {
    const assignments = await Assignment.find({ asset: assetId })
      .populate('asset', 'assetName serialNumber status') // Changed 'name' to 'assetName'
      .populate('employee', 'name department');
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
