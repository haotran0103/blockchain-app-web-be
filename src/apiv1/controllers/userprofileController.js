const db = require("../../configs/configsDatabase");
const sessions = {};
const moment = require("moment");
module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM project WHERE maVi = ? ORDER BY ngayTao DESC";
    db.query(sql, [req.params.userID], (err, response) => {
      console.log(response);
      if (err) throw err;
      res.json(response);
    });
  },

  updateprofile: (req, res) => {
    let maVi = req.params.maVi;
    let { tenDuAn, moTa, ngayCapNhat } = req.body;

    let sql = "SELECT * FROM project WHERE maVi = ?";
    db.query(sql, [maVi], (err, result) => {
      if (err) throw err;

      if (result.length) {
        // Mã ví đã tồn tại, thực hiện truy vấn UPDATE
        sql =
          "UPDATE project SET userName = ?, emailAdress = ?, phoneNumber = ?,avatar=? WHERE maVi = ?";
        db.query(
          sql,
          [userName, emailAdress, phoneNumber, avatar, maVi],
          (err, result) => {
            if (err) throw err;
            console.log(result.affectedRows + " dự án đã được cập nhật.");
            res.json({ message: "Cập nhật thành công!" });
          }
        );
      } else {
        // Mã ví chưa tồn tại, thực hiện truy vấn INSERT
        sql =
          "INSERT INTO project (maVi, userName, emailAdress, phoneNumber,avatar) VALUES (?, ?, ?, ?,?)";
        db.query(
          sql,
          [maVi, userName, emailAdress, phoneNumber, avatar],
          (err, result) => {
            if (err) throw err;
            console.log(result.affectedRows + " dự án đã được thêm mới.");
            res.json({ message: "Thêm mới thành công!" });
          }
        );
      }
    });
  },
};
