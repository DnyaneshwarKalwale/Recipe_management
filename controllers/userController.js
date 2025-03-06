import User from '../models/userModel.js';
import { errorResponse } from '../utils/ErrorResponse.js';

export const getUserProfile = async (req, res) => {
  try {
    // Get user profile with recipes
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('recipes', 'title category');

    if (!user) return errorResponse(res, 404, 'User not found');
    
    res.json(user);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    // Update profile
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};