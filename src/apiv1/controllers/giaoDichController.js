"use strict";

const db = require("../../configs/configsDatabase");

module.exports = {
  get: (req, res) => {
    let sql =
      "SELECT g.*, p.* FROM giaoDich g INNER JOIN project p ON g.idProject = p.id WHERE g.maVi = ?";
    db.query(sql, [req.params.maVi], (err, response) => {
      if (err) throw err;
      console.log(response);
      res.json(response);
    });
  },
};
