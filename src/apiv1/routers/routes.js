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

  let registerCtrl = require("../controllers/registerController");
  app.route("/apiv1/register").post(registerCtrl.post);

  let paymentCrtl = require("../controllers/paymentController");
  app.route("/apiv1/payment").post(paymentCrtl.payment);

let transactionCtrl = require('../controllers/transactionController');
  app.route('/apiv1/transactionCtrl')
    .post(transactionCtrl.post)
    
 

};
