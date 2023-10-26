const express = require("express");
const router = express.Router();
const { electricFleet, deleteVehicle, renderEditVehicleForm, postNewVehicleForm, addNewVehicle, postEditVehicleForm } = require('../controllers/Pages');
// const { getLoginForm, postLoginForm } = require('../controllers/User');
const { isAuthenticated } = require('../Middlewares/Middlewares')
// const { isAuthenticated } = require('../Middlewares/Middlewares')
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

router
    .route('/')
    .get(electricFleet)

router
    .route('/add-vehicle')
    .get(isAuthenticated, addNewVehicle)
    .post(
        isAuthenticated,
        upload.array('image'),
        postNewVehicleForm
    )

router
    .route("/:id/edit")
    .get(isAuthenticated, renderEditVehicleForm)
    .put(isAuthenticated, upload.array('image'), postEditVehicleForm)

router
    .route("/:id/delete")
    .delete(isAuthenticated, deleteVehicle)


module.exports = router