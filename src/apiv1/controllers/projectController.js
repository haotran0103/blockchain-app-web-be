const db = require("../../configs/configsDatabase");
const sessions = {};
const moment = require("moment");
module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM project WHERE trangThai=0";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  detail: (req, res) => {
    let sql =
      "SELECT project.*, theloai.tenLoai FROM project INNER JOIN theloai ON project.loaiDuAn = theloai.id and project.id = ?";
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
      res.status(200).json({ message: "Update success!" });
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
      avatarDuAn,
      tienDo,
    } = req.body;
    console.log(maVi);
    const now = moment();
    const currentDate = now.format("DD");
    const currentMonth = now.format("MM");
    const currentYear = now.format("YYYY");
    const query = `INSERT INTO project (id, tenProject, moTa, anhBia, video, soTien, diaChiWeb, soTienToiThieu, chucVu, loiHua, loaiDuAn,trangThai,maVi,userName , phoneNumber, emailAddress, address,ngayTao,ngayHetHan,avatarDuAn,tienDo) 
                    VALUES ('','${projecttitle}', '${moTaDuAn}', '${anhBia}', '${video}', '${Amounts}', '${websiteAddress}', '${khoangTien}', '${chucVu}', '${loiHua}', '${theLoai}','','${maVi}', '${userName}', '${phoneNumber}', '${emailAdress}', '${address}', '${currentYear}}${currentMonth}/${currentDate}', '${startDate}','${avatarDuAn}', '${tienDo}')`;
    db.query(query, (error, results) => {
      if (error) throw error;
      res.status(201).json({ dict: "/" });
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
  detail: (req, res) => {
    let sql = "SELECT * FROM project WHERE id = ?";
    db.query(sql, [req.params.projectID], (err, response) => {
      if (err) throw err;
      res.json(response[0]);
    });
  },
};
