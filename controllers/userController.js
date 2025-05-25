const User = require("../models/User");
const Task = require("../models/Task");

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update user position (superadmin only)
// @route   PUT /api/users/:id/position
// @access  Private/superadmin
const updateUserPosition = async (req, res) => {
  try {
    const { position } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.position = position;
    await user.save();
    res.json({ message: "User position updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update user profile photo
// @route   PUT /api/users/:id/profile-photo
// @access  Private
const updateUserProfilePhoto = async (req, res) => {
  try {
    const { profileImageUrl } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.profileImageUrl = profileImageUrl;
    await user.save();
    res.json({ message: "User profile photo updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update user role (superadmin only)
// @route   PUT /api/users/:id/role
// @access  Private/superadmin
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role || !["superadmin", "admin", "hrd", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = role;
    await user.save();
    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUserPosition,
  updateUserProfilePhoto,
  updateUserRole,
};
