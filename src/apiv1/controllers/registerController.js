const sessions = {};
const jwt = require('jsonwebtoken');
module.exports = {
  // Đăng kí API endpoint
  post: (req, res) => {
    const { username, password, email, name, phone, address } = req.body;

    // Kiểm tra xem người dùng đã tồn tại hay chưa
    if (sessions[username]) {
      return res.status(400).json({ message: 'Người dùng đã tồn tại' });
    }

    // Tạo token cho người dùng mới
    const token = jwt.sign({ username: username }, 'secretkey');
    sessions[username] = token;

    res.json({
      success: true,
      message: 'Người dùng đã được đăng kí thành công',
      data: {
        username: username,
        email: email,
        name: name,
        password: password,
        phone: phone,
        address: address
      }
    });
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
