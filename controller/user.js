const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const allUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const oneUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);

    if (user) {
      res.status(200).json({
        data: user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = userModel.findById(req.params.userId);

    if (user) {
      const newUser = await userModel.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      res.status(200).json({
        data: newUser,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = userModel.findById(req.params.userId);

    if (user) {
      await userModel.findByIdAndDelete(req.params.userId);
      res.status(204).json({
        message: "User deleted",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const findUser = await userModel.findOne({ email });

    if (findUser) {
      res.status(200).json({
        message: "User with this email already exist",
      });
    } else {
      const salt = await bcrypt.genSalt(15);
      const hashed = await bcrypt.hash(password, salt);
      const user = await userModel.create({
        fullname,
        email,
        password: hashed,
      });

      res.status(201).json({
        data: user,
        message: "user created",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      const comparePass = await bcrypt.compare(password, user.password);

      if (comparePass) {
        const { password, ...rest } = user._doc;
        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.MYSECRET,
          { expiresIn: "1d" }
        );

        res.status(200).json({
          data: { token, ...rest },
          message: "Login Successful",
        });
      } else {
        res.status(400).json({
          message: "Password is incorrect",
        });
      }
    } else {
      res.status(200).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  allUsers,
  oneUser,
  deleteUser,
  updateUser,
  createUser,
  signIn,
};
