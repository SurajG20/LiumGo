const express = require('express');
const router = express.Router();
const {
  home,
  about,
  service,
  blog,
  jobs,
  contact,
  renderJobDetails,
  renderBlogDetails,
  renderPrivacyPolicy,
  aboutDetails,
} = require('../controllers/Pages');

router.route('/').get(home);

router.route('/about').get(about);
router.route('/about-details').get(aboutDetails);

router.route('/services').get(service);

router.route('/jobs').get(jobs);

router.route('/blogs').get(blog);

router.route('/contact').get(contact);

router.route('/job-details/:id').get(renderJobDetails);

router.route('/blog-details/:id').get(renderBlogDetails);

router.route('/privacy-policy').get(renderPrivacyPolicy);

module.exports = router;
