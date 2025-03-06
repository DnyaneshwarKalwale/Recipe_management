import User from '../models/userModel.js';
import { generateToken } from '../utils/Token.js';
import { errorResponse } from '../utils/ErrorResponse.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return errorResponse(res, 400, 'User already exists');

    // Create new user
    const user = await User.create({ name, email, password });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
    
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 401, 'Invalid credentials');

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return errorResponse(res, 401, 'Invalid credentials');

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
    
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};