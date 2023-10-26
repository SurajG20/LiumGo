const express = require('express');
const router = express.Router();
const {
  blog,
  deleteBlog,
  renderEditBlogForm,
  postNewBlogForm,
  addNewBlog,
  postEditBlogForm,
} = require('../controllers/Pages');
const { isAuthenticated } = require('../Middlewares/Middlewares');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

router.route('/').get(blog);

router
  .route('/add-blogs')
  .get(isAuthenticated, addNewBlog)
  .post(isAuthenticated, upload.array('image'), postNewBlogForm);

router
  .route('/:id/edit')
  .get(isAuthenticated, renderEditBlogForm)
  .put(isAuthenticated, upload.array('image'), postEditBlogForm);

router.route('/:id/delete').delete(isAuthenticated, deleteBlog);

module.exports = router;
