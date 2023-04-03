'use strict';
module.exports = function(app) {
  let productsCtrl = require('../controllers/projectController');

  // todoList Routes
  app.route('/apiv1/projects')
    .get(productsCtrl.get)
    .post(productsCtrl.store);

  app.route('/apiv1/projects/:projectID')
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);

let categorysCtrl = require('../controllers/categoryController');

  app.route('/apiv1/category')
    .get(categorysCtrl.get)
    .post(categorysCtrl.store);

  app.route('/apiv1/category/:categoryID')
    .get(categorysCtrl.detail)
    .put(categorysCtrl.update)
    .delete(categorysCtrl.delete);
};
