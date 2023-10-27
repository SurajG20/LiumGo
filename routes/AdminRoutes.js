const express = require('express');
const router = express.Router();
const { getLoginForm, postLoginForm } = require('../controllers/User');

router.route('/').get(getLoginForm).post(postLoginForm);

module.exports = router;
