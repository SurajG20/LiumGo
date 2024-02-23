const express = require('express');
const router = express.Router();
const {
  about,
  deleteProfile,
  renderEditProfileForm,
  postNewProfileForm,
  addNewProfile,
  postEditProfileForm,
} = require('../controllers/Pages');
const { isAuthenticated } = require('../Middlewares/Middlewares');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

router.route('/').get(about);

router
  .route('/add-profile')
  .get(isAuthenticated, addNewProfile)
  .post(isAuthenticated, upload.array('image'), postNewProfileForm);

router
  .route('/:id/edit')
  .get(isAuthenticated, renderEditProfileForm)
  .put(isAuthenticated, upload.array('image'), postEditProfileForm);

router.route('/:id/delete').delete(isAuthenticated, deleteProfile);

module.exports = router;
