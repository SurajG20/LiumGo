const express = require('express');
const router = express.Router();
const {
  contact,
  addNewDetail,
  postNewDetailForm,
} = require('../controllers/Pages');
const { isAuthenticated } = require('../Middlewares/Middlewares');

router.route('/').get(contact);

router
  .route('/add-detail')
  .get(isAuthenticated, addNewDetail)
  .post(isAuthenticated, postNewDetailForm);

module.exports = router;
