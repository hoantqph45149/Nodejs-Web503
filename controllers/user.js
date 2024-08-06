import User from "../models/User.js";
import { generateToken } from "../utils/jwtToken.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export const SingIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }
    const checkPassword = await comparePassword(
      req.body.password,
      user.password
    );
    if (!checkPassword) {
      return res.status(400).json({
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }
    const token = generateToken({ _id: user._id });
    if (!token) {
      return res.status(400).json({
        message: "Đăng nhập thất bại",
      });
    }
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      data: user,
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const SingUp = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({
        message: "Tài khoản đã tồn tại",
      });
    }
    const has = hashPassword(req.body.password);
    req.body.password = has;
    const newUser = await User.create(req.body);
    if (!newUser) {
      return res.status(400).json({
        message: "Đăng ký thất bại",
      });
    }
    newUser.password = undefined;
    return res.status(200).json({
      message: "Đăng ký thành công",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
