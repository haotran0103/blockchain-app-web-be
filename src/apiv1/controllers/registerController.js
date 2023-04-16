const sessions = {};
const jwt = require("jsonwebtoken");

module.exports = {
  // Đăng kí API endpoint
  post: (req, res) => {
    const selectQuery = `SELECT maVi FROM user WHERE maVi = '${req.params.maVi}'`;
    const insertQuery = `INSERT INTO user (maVi, userName, emailAdress, phoneNumber, avatar) 
                         VALUES ('${req.params.maVi}','${req.body.userName}','${req.body.emailAddress}','${req.body.phoneNumber}','${req.body.avatar}')`;

    db.query(selectQuery, (err, rows) => {
      if (err) throw err;

      if (rows.length === 0) {
        db.query(insertQuery, (err, response) => {
          if (err) throw err;
          res.json(response);
        });
      } else {
        res.status(400).json({ message: "maVi already exists" });
      }
    });
  },
};
