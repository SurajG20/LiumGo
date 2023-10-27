const express = require('express');
const router = express.Router();
const {
  jobs,
  deleteJob,
  renderEditJobForm,
  postNewJobForm,
  addNewJob,
  postEditJobForm,
  renderJobDetails,
} = require('../controllers/Pages');
const { isAuthenticated } = require('../Middlewares/Middlewares');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

router.route('/').get(jobs);

router
  .route('/add-jobs')
  .get(isAuthenticated, addNewJob)
  .post(isAuthenticated, upload.array('image'), postNewJobForm);

router
  .route('/:id/edit')
  .get(isAuthenticated, renderEditJobForm)
  .put(isAuthenticated, upload.array('image'), postEditJobForm);

router.route('/:id/delete').delete(isAuthenticated, deleteJob);

module.exports = router;
