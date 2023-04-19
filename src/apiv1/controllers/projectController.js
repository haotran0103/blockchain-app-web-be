const db = require("../../configs/configsDatabase");
const sessions = {};
const moment = require("moment");
module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM project";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  detail: (req, res) => {
    let sql =
      "SELECT project.*, theloai.tenloai FROM project INNER JOIN theloai ON project.loaiDuAn = theloai.id and project.id = ?";
    db.query(sql, [req.params.projectID], (err, response) => {
      if (err) throw err;
      res.json(response[0]);
    });
  },
  update: (req, res) => {
    let data = req.body;
    let projectID = req.params.projectID;
    let sql = "UPDATE project SET ? WHERE id = ?";
    db.query(sql, [data, projectID], (err, response) => {
      if (err) throw err;
      res.json({ message: "Update success!" });
    });
  },
  store: (req, res) => {
    const {
      userName,
      projecttitle,
      Amounts,
      websiteAddress,
      phoneNumber,
      emailAdress,
      address,
      khoangTien,
      chucVu,
      loiHua,
      moTaDuAn,
      maVi,
      anhBia,
      theLoai,
      video,
      startDate,
    } = req.body;
    console.log(maVi);
    const now = moment();
    const currentDate = now.format("DD");
    const currentMonth = now.format("MM");
    const currentYear = now.format("YYYY");
    const query = `INSERT INTO project (id, tenProject, moTa, anhBia, video, soTien, diaChiWeb, soTienToiThieu, chucVu, loiHua, loaiDuAn,trangThai,maVi,userName , phoneNumber, emailAddress, address,ngayTao,ngayHetHan) 
                    VALUES ('','${projecttitle}', '${moTaDuAn}', '${anhBia}', '${video}', '${Amounts}', '${websiteAddress}', '${khoangTien}', '${chucVu}', '${loiHua}', '${theLoai}','','${maVi}', '${userName}', '${phoneNumber}', '${emailAdress}', '${address}', '${currentYear}}${currentMonth}/${currentDate}', '${startDate}')`;
    db.query(query, (error, results) => {
      if (error) throw error;
      res.json({ dict: "/" });
      console.log("Dự án đã được thêm vào database.");
    });
    // save the url to database
  },
  delete: function (req, res) {
    let sql = "DELETE FROM project WHERE id = ?";
    db.query(sql, [req.params.projectID], function (err, response) {
      if (err) throw err;
      res.json({ message: "Delete success!" });
    });
  },
};
