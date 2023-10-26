const express = require("express");
const passport = require("passport");
const router = express.Router();
const { getLoginForm, postLoginForm } = require('../controllers/User')
// const { isAuthenticated } = require('../Middlewares/Middlewares')
const { home, about, service, electricFleet, blog, jobs, contact } = require('../controllers/Admin');


router
    .route("/")
    .get(getLoginForm)
    .post(postLoginForm)


// router
//     .route("/home")
//     .get(isAuthenticated, home)

// router
//     .route('/about')
//     .get(isAuthenticated, about)

// router
//     .route('/services')
//     .get(isAuthenticated, service)

// router
//     .route('/electric-fleet')
//     .get(isAuthenticated, electricFleet)

// router
//     .route('/jobs')
//     .get(isAuthenticated, jobs)

// router
//     .route('/blogs')
//     .get(isAuthenticated, blog)

// router
//     .route('/contact')
//     .get(isAuthenticated, contact)




module.exports = router