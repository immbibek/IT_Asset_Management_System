import { userModel as User } from '../models/User.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { name, email, password, department } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      department: department || 'Unassigned',
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', user: { id: user._id, name: user.name, email: user.email, department: user.department } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
