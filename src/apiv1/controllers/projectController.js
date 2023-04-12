const util = require("util");
const mysql = require("mysql2");
const db = require("../../configs/configsDatabase");
const admin = require("firebase-admin");
const serviceAccount = require("../../configs/serviceAccountKey.json");
const sessions = {};
module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM project";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  detail: (req, res) => {
    let sql = "SELECT * FROM project WHERE id = ?";
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
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "blockchainweb-5f8bb.appspot.com",
    });

    // Initialize Firebase
    const bucket = admin.storage().bucket();

    async function uploadFileToStorage(file, folderName) {
      const folder = bucket.name + "/" + folderName;
      const fileName = `${Date.now()}-${file.originalname}`;
      const fileUpload = bucket.file(`${folder}/${fileName}`);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on("error", (error) => {
        console.log(error);
      });

      blobStream.on("finish", () => {
        console.log(`File ${fileName} has been uploaded to Firebase Storage.`);
      });

      blobStream.end(file.buffer);

      const [url] = await fileUpload.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });

      return url;
    }

    const file = req.body.video;
    const image = req.body.anhBia; // assume req.file is the uploaded file
    const foldervideo = "videos"; // the name of the folder to store the file
    const folderAnhbia = "anhBias"; //
    const urlVideo = uploadFileToStorage(file, foldervideo);
    const urlImage = uploadFileToStorage(image, folderAnhbia);

    const {
      projecttitle,
      Amounts,
      websiteAddress,
      phoneNumber,
      emailAdress,
      address,
      khoangTien,
      chucVu,
      loiHua,
      moTa,
      anhBia,
      theLoai,
      video,
    } = project;
    const query = `INSERT INTO project (id, tenProject, moTa, anhBia, video, soTien, diaChiWeb, soTienToiThieu, chucVu, loiHua, loaiDuAn) 
                    VALUES ('','${projecttitle}', '${moTa}', '${urlImage}', '${urlVideo}', '${Amounts}', '${websiteAddress}', '${khoangTien}'
                    , '${chucVu}', '${loiHua}', '${theLoai}')`;
    connection.query(query, (error, results) => {
      if (error) throw error;
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
