import bcrypt from "bcrypt";
import User from "../Models/UserModel.js";

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({
        message: "name, email and password required",
      });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(422).json({
        message: "User already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashPassword,
      age,
    });
    await user.save();

    return res.status(201).json({
      message: "User registred successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        message: "email and password required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(404).json({
        message: "wrong password",
      });
    }

    return res.status(200).json({
      message: "user login successful",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

// Get user by id
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    return res.status(200).json({
      message: "id fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password, age },
      { new: true }
    );
    return res.status(200).json({
      message: "update successful",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      message: "id deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};