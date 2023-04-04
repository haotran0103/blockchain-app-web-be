'use strict'

const util = require('util')
const mysql = require('mysql2')
const db = require('../../configs/configsDatabase')

const sessions = {}

module.exports = {
  // Đăng nhập API endpoint
  get: (req, res) => {
    const { username, password } = req.body;
  
    // Kiểm tra thông tin đăng nhập
    if (username === 'admin' && password === '123') {
      // Tạo phiên đăng nhập cho người dùng
      const token = jwt.sign({ username: username }, 'secretkey');
      res.json({ success: true, token: token });
    } else {
      res.json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }
  },
  
  // Yêu cầu API cần xác thực
  get: (req, res) => {
    res.json({ message: 'Dữ liệu cần xác thực' });
  },
  
  // Xác thực middleware
  verifyToken: (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'Không có quyền truy cập' });
    }
  
    // Xác thực token
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token không hợp lệ' });
      }
      req.username = decoded.username;
      next();
    });
  }
};
