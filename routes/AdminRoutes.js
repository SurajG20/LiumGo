const express = require('express');
const router = express.Router();
const { getLoginForm, postLoginForm, logout } = require('../controllers/User');

router.route('/').get(getLoginForm).post(postLoginForm);
router.route('/logout').post(logout);

module.exports = router;
