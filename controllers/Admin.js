const Vehicles = require('../models/Vehicles')

module.exports.home = (req, res) => {
    res.render('index')
}
module.exports.about = (req, res) => {
    res.render('about')
}
module.exports.service = (req, res) => {
    res.render('service')
}
module.exports.electricFleet = async (req, res) => {
    const vehicles = await Vehicles.find();
    res.render('electric-fleet', { vehicles });
}
module.exports.jobs = (req, res) => {
    res.render('jobs')
}
module.exports.blog = (req, res) => {
    res.render('blog-standard')
}
module.exports.contact = (req, res) => {
    res.render('contact')
}