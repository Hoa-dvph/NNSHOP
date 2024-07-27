// controllers/auth.ts
import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Người dùng đã tồn tại.' });
    }
    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng ký.' });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Địa chỉ email hoặc mật khẩu không đúng.' });
    }
    // So sánh mật khẩu đã mã hóa
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Địa chỉ email hoặc mật khẩu không đúng.' });
    }
    // Đăng nhập thành công
    res.status(200).json({ message: 'Đăng nhập thành công.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng nhập.' });
  }
};
