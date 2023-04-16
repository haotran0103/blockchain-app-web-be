const db = require("../../configs/configsDatabase");
module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM project WHERE loaiDuAn = ? ORDER BY ngayTao DESC";
    db.query(sql, [req.params.categoryID], (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
};
