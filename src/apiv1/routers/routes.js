"use strict";
const cors = require("cors");
module.exports = function (app) {
  let productsCtrl = require("../controllers/projectController");
  app.use(cors());
  // todoList Routes
  app.route("/apiv1/projects").get(productsCtrl.get).post(productsCtrl.store);

  app
    .route("/apiv1/projects/:projectID")
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);

  let categorysCtrl = require("../controllers/categoryController");

  app.route("/apiv1/category").get(categorysCtrl.get).post(categorysCtrl.store);

  app
    .route("/apiv1/category/:categoryID")
    .get(categorysCtrl.detail)
    .put(categorysCtrl.update)
    .delete(categorysCtrl.delete);

  let loginCtrl = require("../controllers/loginController");
  app.route("/apiv1/login").get(loginCtrl.get);

  let paymentCrtl = require("../controllers/paymentController");
  app.route("/apiv1/payment").post(paymentCrtl.payment).get(paymentCrtl.get);

  let registerCrtl = require("../controllers/registerController");
  app.route("/apiv1/register/:maVi").post(registerCrtl.post);

  let returnCrtl = require("../controllers/returnController");
  app.route("/vnpay_return").post(returnCrtl.post);

  let transactionCtrl = require("../controllers/transactionController");
  app
    .route("/apiv1/transactionCtrl")
    .get(transactionCtrl.post)
    .post(transactionCtrl.save);

  let projectScateCrtl = require("../controllers/project_categoryController");
  app.route("/apiv1/projectCategory/:categoryID").get(projectScateCrtl.get);

  let userCrtl = require("../controllers/userprofileController");
  app
    .route("/apiv1/userprofile/:userID")
    .get(userCrtl.get)
    .patch(userCrtl.updateprofile);

  let giaoDichCrtl = require("../controllers/giaoDichController");
  app.route("/apiv1/giaoDich/:maVi").get(giaoDichCrtl.get);
};
